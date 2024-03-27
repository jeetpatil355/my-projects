using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using bus = NServiceBus;
using Parking.Management.Endpoint.Handlers;
using Parking.Management.Engine.Services;
using NServiceBus;
using Microsoft.AspNetCore.Hosting.Internal;

namespace Parking.Management.Endpoint

{
    public class Program 
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build(); 
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var endpointConfiguration = new EndpointConfiguration("Parking.Management.Endpoint");
                endpointConfiguration.UseTransport<LearningTransport>();
                var endpointInstance = await bus.Endpoint.Start(endpointConfiguration).ConfigureAwait(false);

                await host.RunAsync().ConfigureAwait(false);
                await endpointInstance.Stop().ConfigureAwait(false);
            }
        }

        private static IHostBuilder CreateHostBuilder(string[] args)
        {
            var config = GetConfiguration();
            
            return Host.CreateDefaultBuilder(args)
                .UseWindowsService()
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddSingleton<IConfiguration>(config);
                    services.AddSingleton<EmailService>();
                    services.AddTransient<AssignParkingSlotCommandHandler>();
                    services.AddSingleton<Microsoft.AspNetCore.Hosting.IApplicationLifetime, ApplicationLifetime>();
                });
                
        }

        private static IConfiguration GetConfiguration()
        {
            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, false)
                .Build();
            return config;
        }


    }
}
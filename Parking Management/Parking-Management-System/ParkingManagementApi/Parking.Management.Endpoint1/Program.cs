using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Parking.Management.Engine;
using static Microsoft.AspNetCore.Hosting.Internal.HostingApplication;

namespace Parking.Management.Endpoint1
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();


            await CreateHostBuilder(args,config).Build().RunAsync().ConfigureAwait(false);

        }

        private static IHostBuilder CreateHostBuilder(string[] args, IConfigurationRoot config)
        {




            return  Host.CreateDefaultBuilder(args)
                
                      //.UseConfiguration(config)
               .ConfigureServices((context, services) =>
               {

                   services.AddSingleton<EmailServiceOptions>();
                   services.Configure<EmailServiceOptions>(config.GetSection("EmailService"));
               });
        }        
    }
}

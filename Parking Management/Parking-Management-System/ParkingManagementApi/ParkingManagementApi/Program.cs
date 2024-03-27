using NServiceBus;
using Parking.Management.Domain.Commands;
using Parking.Management.Engine;
using Parking.Management.Engine.Services;
using Parking.Management.Infrastructure;
using Parking.Management.Infrastructure.SQLRepositories.Interfaces;
using Endpoint = NServiceBus.Endpoint;

namespace ParkingManagementApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddSingleton<DapperContext>();
            builder.Services.AddScoped<IDatabaseOperation, DataBaseOperation>();
            builder.Services.AddSingleton<IEmailService, EmailService>();

               
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
            
        }
    }
}
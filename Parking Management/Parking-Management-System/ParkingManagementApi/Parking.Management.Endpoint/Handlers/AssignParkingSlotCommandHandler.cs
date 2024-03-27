using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NServiceBus;
using Parking.Management.Domain.Commands;
using Parking.Management.Engine;
using Parking.Management.Engine.Services;

namespace Parking.Management.Endpoint.Handlers
{
    public class AssignParkingSlotCommandHandler : IHandleMessages<AssignParkingSlotCommand>
    {
        private readonly EmailService _emailService;
  
        public AssignParkingSlotCommandHandler(EmailService emailService)
        {
            _emailService = emailService;
 
        }

        public Task Handle(AssignParkingSlotCommand message, IMessageHandlerContext context)
        {
            // Send email
            var toAddress = message.employee.Emp_mailId;
            var subject = "Parking Slot Assigned";
            var body = $"Dear {message.employee.FirstName},\n\n" +
                       $"Your vehicle has been assigned parking slot {message.availableSlot.ParkingSlot_No} on floor {message.availableSlot.Parking_Floor}.\n\n" +
                       $"Regards,\n" +
                       $"Parking Management";
            _emailService.SendEmail(toAddress, subject, body);

            return Task.CompletedTask;
        }
    }
}

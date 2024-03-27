using NServiceBus;
using Parking.Management.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parking.Management.Domain.Commands
{
    public class AssignParkingSlotCommand : IMessage
    {
       public Employee employee { get; set; }
        public Vehicle vehicle { get; set; }
        public ParkingSlot availableSlot { get; set; }
    }
}

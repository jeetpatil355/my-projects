using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parking.Management.Domain.Models
{
    public class ParkingSlot
    {
        public int ParkingSlot_No { get; set; }
        public int Parking_Floor { get; set; }
        public string? parking_slot_status { get; set; }
        public string? ParkingSlot_Type { get; set; }
        public int VehicleId { get; set; }  
    }
}

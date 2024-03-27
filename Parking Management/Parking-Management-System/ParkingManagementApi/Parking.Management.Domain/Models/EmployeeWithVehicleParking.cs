using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parking.Management.Domain.Models
{
    public class EmployeeWithVehicleParking
    {
        //Property's for EmployeeData

        public int EmpId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public string? Emp_mailId { get; set; }
        public long PhoneNumber { get; set; }
      

        //Property's for VehicleData
        public int VehicleId { get; set; }
        public string? Vehicle_RegistrationNo { get; set; } = string.Empty;
        public string? Vehicle_Type { get; set; } = string.Empty;
        public string? vehicle_discription { get; set; } = string.Empty;
       

        //Property's for ParkingSlotData
        public int ParkingSlot_No { get; set; }
        public int Parking_Floor { get; set; }
        public string? parking_slot_status { get; set; }
        public string? ParkingSlot_Type { get; set; } = string.Empty;
         

    }
}

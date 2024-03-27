using System.Numerics;

namespace Parking.Management.Domain.Models
{
    public class EmployeeResult
    {
        public int EmpId { get; set; }
        public string? FirstName { get; set; } 
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public string? Emp_mailId { get; set; } 
        public long PhoneNumber { get; set; }

        public ParkingSlot? AssignedParkingSlot { get; set; }
    }
}

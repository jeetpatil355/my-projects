namespace Parking.Management.Domain.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public string? Vehicle_RegistrationNo { get; set; } = string.Empty;
        public string? Vehicle_Type { get; set; } = string.Empty;
        public string? vehicle_discription { get; set; } = string.Empty;
        public int EmpId { get; set; }  
        
    }
}

using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Parking.Management.Domain.Models
{
    public class Employee
    {
        public int EmpId { get; set; }

        [Required]
        [MinLength(2)]
        public string? FirstName { get; set; }

        [Required]
        [MinLength(2)]
        public string? LastName { get; set; }
        public string? Gender { get; set; }

        [Required]
        [EmailAddress]
        public string? Emp_mailId { get; set; }

        [Required]
        //[Phone]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be 10 digits")]
        public long PhoneNumber { get; set; }

    }
}

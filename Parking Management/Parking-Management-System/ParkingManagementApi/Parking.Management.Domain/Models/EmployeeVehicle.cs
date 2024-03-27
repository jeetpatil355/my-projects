using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parking.Management.Domain.Models
{
    public class EmployeeVehicle
    {
        public Employee? employee { get; set; }  
        public Vehicle? vehicle { get; set; } 
    }
}

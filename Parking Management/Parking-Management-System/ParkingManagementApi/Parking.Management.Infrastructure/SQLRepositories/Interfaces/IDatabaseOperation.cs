using Parking.Management.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parking.Management.Infrastructure.SQLRepositories.Interfaces
{
    public interface IDatabaseOperation
    {
        //Methods for Employee Data
        public Task<IEnumerable<EmployeeWithVehicleParking>> GetAllEmployeeData();
        public Task<EmployeeWithVehicleParking> GetEmployeeById(int id);
        public Task<EmployeeResult> AddEmployee(EmployeeVehicle employeeVehicle);
        public Task<bool> DeleteEmployee(int id);
        public Task<Employee> UpdateEmployee(int id, Employee employee);

        //Methods for Vehicle Data
        public Task<IEnumerable<Vehicle>> GetVehicleData();
        public Task<Vehicle> GetVehicleById(int id);
        public Task<Vehicle> AddVehicle(Vehicle NewVehicle, IDbTransaction dbTransaction);

        public Task<ParkingSlot> AssignParkingSlot(Vehicle vehicle, IDbTransaction dbTransaction);

        //public Task<Employee> GetEmployeeByParkingSlot(string ParkingSlot_No);
    }
}

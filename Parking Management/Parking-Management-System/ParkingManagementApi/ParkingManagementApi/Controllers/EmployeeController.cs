using Microsoft.AspNetCore.Mvc;
using Parking.Management.Domain.Models;
using Parking.Management.Infrastructure.SQLRepositories.Interfaces;
using System.Net.Mail;
using System.Net;

namespace ParkingManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IDatabaseOperation _databaseOperation;

        public EmployeeController(IDatabaseOperation databaseOperation)
        {
            _databaseOperation = databaseOperation;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _databaseOperation.GetAllEmployeeData();
            return Ok(employees);
        }

        [HttpGet("{id}",Name = "EmployeeById")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _databaseOperation.GetEmployeeById(id);
            if (employee is null)   
                return NotFound();
            return Ok(employee);
        }


        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeVehicle employeeVehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var addedEmployee = await _databaseOperation.AddEmployee(employeeVehicle);
            if (addedEmployee == null)
                return BadRequest("Unable to assign parking slot to vehicle");
            else
                return Ok(addedEmployee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var success = await _databaseOperation.DeleteEmployee(id);
            if (success)
                return NoContent();
            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee employee)
        {
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedEmployee = await _databaseOperation.UpdateEmployee(id, employee);
            if (updatedEmployee != null)
                return Ok(updatedEmployee);
            else
                return NotFound();
        }


    }
}



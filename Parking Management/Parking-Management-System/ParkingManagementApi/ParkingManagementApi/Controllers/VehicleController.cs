using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Parking.Management.Domain.Models;
using Parking.Management.Infrastructure;
using Parking.Management.Infrastructure.SQLRepositories.Interfaces;
using System.Data.SqlClient;

namespace ParkingManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IDatabaseOperation _databaseOperation;

        public VehicleController(IDatabaseOperation databaseOperation)
        {
            _databaseOperation = databaseOperation;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicle()
        {
            var vehicles = await _databaseOperation.GetVehicleData();
            return Ok(vehicles);
        }

        [HttpGet("{id}", Name = "VehicleById")]
        public async Task<IActionResult> GetVehicleById(int id)
        {
            var vehicle = await _databaseOperation.GetVehicleById(id);
            if (vehicle is null)
                return NotFound();
            return Ok(vehicle);
        }
    }
}

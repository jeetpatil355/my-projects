using Dapper;
using Parking.Management.Domain.Models;
using Parking.Management.Engine;
using Parking.Management.Infrastructure.SQLRepositories.Interfaces;
using System.Data;
using System.Transactions;

namespace Parking.Management.Infrastructure
{
    public class DataBaseOperation : IDatabaseOperation
    {
        
        private readonly DapperContext _context;
        private readonly IEmailService _emailService;

        public DataBaseOperation(DapperContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        
        }

        public async Task<EmployeeResult> AddEmployee(EmployeeVehicle employeeVehicle)
        {

            var sql = "INSERT INTO Employee (FirstName, LastName, Gender, Emp_mailId, PhoneNumber) " +
             "VALUES (@FirstName, @LastName, @Gender, @Emp_mailId, @PhoneNumber); " +
             "SELECT CAST(SCOPE_IDENTITY() as int)";
            using (var connection = _context.CreateConnection())
            {
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {

                        var id = await connection.ExecuteScalarAsync<int>(sql, new
                        {
                            FirstName = employeeVehicle.employee.FirstName,
                            LastName = employeeVehicle.employee.LastName,
                            Gender = employeeVehicle.employee.Gender,
                            Emp_mailId = employeeVehicle.employee.Emp_mailId,
                            PhoneNumber = employeeVehicle.employee.PhoneNumber,
                            
                        }, transaction);
                        employeeVehicle.employee.EmpId = id;


                        Vehicle newVehicle = new Vehicle()
                        {
                            VehicleId = employeeVehicle.vehicle.VehicleId,
                            Vehicle_RegistrationNo = employeeVehicle.vehicle.Vehicle_RegistrationNo,
                            Vehicle_Type = employeeVehicle.vehicle.Vehicle_Type,
                            vehicle_discription = employeeVehicle.vehicle.vehicle_discription,
                            EmpId = employeeVehicle.employee.EmpId
                        };

                        var vehicle = await AddVehicle(newVehicle, transaction);

                        var availableSlot = await AssignParkingSlot(vehicle, transaction);


                        if (availableSlot != null)
                        {
                            EmployeeResult employeeResult = new EmployeeResult();
                            employeeResult.EmpId = employeeVehicle.employee.EmpId;
                            employeeResult.FirstName = employeeVehicle.employee.FirstName;
                            employeeResult.LastName = employeeVehicle.employee.LastName;
                            employeeResult.Gender = employeeVehicle.employee.Gender;
                            employeeResult.Emp_mailId = employeeVehicle.employee.Emp_mailId;
                            employeeResult.PhoneNumber = employeeVehicle.employee.PhoneNumber;
                            

                            employeeResult.AssignedParkingSlot = availableSlot;
                            transaction.Commit();

                            _emailService.SendEmail(employeeResult.Emp_mailId, "Parking Slot Assigned", $"Dear {employeeVehicle.employee.FirstName} Your vehicle has been assigned parking slot {availableSlot.ParkingSlot_No} On Floor {availableSlot.Parking_Floor}");

                            return employeeResult;
                        }
                        else
                        {
                            transaction.Rollback();
                            return null;
                        }
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        //var deleteParkingSlotQuery = "DELETE FROM ParkingSlot WHERE VehicleId IN (SELECT VehicleId FROM Vehicle WHERE EmpId = @id)";
                        //var rowsAffected = await connection.ExecuteAsync(deleteParkingSlotQuery, new { id }, transaction);

                        var updateparkingslotQuery = "UPDATE ParkingSlot SET VehicleId = NULL, parking_slot_status = 'Available' WHERE VehicleId = @id";
                        var rowsAffected = await connection.ExecuteAsync(updateparkingslotQuery, new { id },transaction);

                        var deleteVehicleQuery = "DELETE FROM Vehicle WHERE EmpId = @id";
                        rowsAffected = await connection.ExecuteAsync(deleteVehicleQuery, new { id }, transaction);

                        var deleteEmployeeQuery = "DELETE FROM Employee WHERE EmpId = @id";
                        rowsAffected = await connection.ExecuteAsync(deleteEmployeeQuery, new { id }, transaction);

                        transaction.Commit();

                        return rowsAffected > 0;
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }


        public async Task<IEnumerable<EmployeeWithVehicleParking>> GetAllEmployeeData()
        {
            var query = "SELECT * FROM Employee E JOIN Vehicle V ON E.EmpId = V.EmpId JOIN ParkingSlot P ON V.VehicleId = P.VehicleId";
            using (var connection = _context.CreateConnection())
            {
                var employees = await connection.QueryAsync<EmployeeWithVehicleParking>(query);
                return employees.ToList();
            }
        }

        public async Task<EmployeeWithVehicleParking> GetEmployeeById(int id)
        {
            var query = @"SELECT * FROM Employee E JOIN Vehicle V ON E.EmpId = V.EmpId JOIN ParkingSlot P ON V.VehicleId = P.VehicleId Where E.EmpId = @id";

            using (var connection = _context.CreateConnection())
            {
                var employee = await connection.QuerySingleOrDefaultAsync<EmployeeWithVehicleParking>(query, new { id });
                return employee;
            }
        }

        public async Task<Employee> UpdateEmployee(int id, Employee employee)
        {
            var query = "UPDATE Employee SET FirstName = @FirstName, LastName = @LastName, Gender = @Gender, Emp_mailId = @Emp_mailId, PhoneNumber = @PhoneNumber WHERE EmpId = @id";

            using (var connection = _context.CreateConnection())
            {
                var rowsAffected = await connection.ExecuteAsync(query, new { id, employee.FirstName, employee.LastName, employee.Gender, employee.Emp_mailId, employee.PhoneNumber });
                if (rowsAffected > 0)
                    return employee;
                return null;
            }
        }

        public async Task<IEnumerable<Vehicle>> GetVehicleData()
        {
            var query = "select * from Vehicle";

            using (var connection = _context.CreateConnection())
            {
                var vehicles = await connection.QueryAsync<Vehicle>(query);
                return vehicles.ToList();
            }
        }

        public async Task<Vehicle> GetVehicleById(int id)
        {
            var query = @"Select VehicleId, Vehicle_RegistrationNo, Vehicle_Type, vehicle_discription, EmpId From Vehicle WHERE VehicleId=@id";

            using (var connection = _context.CreateConnection())
            {
                var vehicles = await connection.QuerySingleOrDefaultAsync<Vehicle>(query, new { id });
                return vehicles;
            }
        }

        public async Task<Vehicle> AddVehicle(Vehicle NewVehicle, IDbTransaction dbTransaction)
        {
            var sql = "INSERT INTO Vehicle ( Vehicle_RegistrationNo, Vehicle_Type, vehicle_discription,EmpId) " +
                "VALUES (@Vehicle_RegistrationNo, @Vehicle_Type, @vehicle_discription,@EmpId); " +
                "SELECT CAST(SCOPE_IDENTITY() as int)";

            var db = dbTransaction.Connection;
            
            try
            {

                var param = new DynamicParameters();
                
                param.Add("@Vehicle_RegistrationNo", NewVehicle.Vehicle_RegistrationNo, DbType.String);
                param.Add("@Vehicle_Type", NewVehicle.Vehicle_Type, DbType.String);
                param.Add("@vehicle_discription", NewVehicle.vehicle_discription, DbType.String);
                param.Add("@EmpId", NewVehicle.EmpId, DbType.Int32);

                var id = await db.ExecuteScalarAsync<int>(sql,
                    param: param,
                    dbTransaction = dbTransaction,
                    commandTimeout: 30
                    );
                NewVehicle.VehicleId = id;
                

                return NewVehicle;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        
        public async Task<ParkingSlot> AssignParkingSlot(Vehicle vehicle, IDbTransaction dbTransaction)
        {
            using (var connection = _context.CreateConnection())
            {
                var db = dbTransaction.Connection;
               
                try
                {
                    // Check for available slot for the specific type of vehicle on all floors
                    var availableSlot = await db.QueryFirstOrDefaultAsync<ParkingSlot>(
                        "SELECT * FROM ParkingSlot WHERE parking_slot_status = 'available' AND ParkingSlot_Type = @ParkingSlot_Type",
                        new { ParkingSlot_Type = vehicle.Vehicle_Type }, dbTransaction);

                    if (availableSlot == null)
                        return availableSlot;


                    // Updating the "ParkingSlot" table to mark the slot as occupied and Updating the "ParkingSlot" table with the VehicleId
                    await db.ExecuteAsync("UPDATE ParkingSlot SET VehicleId = @VehicleId, parking_slot_status = 'Occupied' WHERE ParkingSlot_No = @ParkingSlot_No", new 
                                                { VehicleId = vehicle.VehicleId, ParkingSlot_No = availableSlot.ParkingSlot_No }, dbTransaction);

                    availableSlot.VehicleId  = vehicle.VehicleId; 
                    
                    return availableSlot;
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

  
    }
}



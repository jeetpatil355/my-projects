import React, { useState } from 'react';
import axios from 'axios';

const GetEmployeeById = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState({});
  const [message, setMessage] = useState("");

  const handleIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://localhost:7082/api/Employee/${employeeId}`)
        .then(res => {
            setEmployee(res.data);
            handleSuccess();
            
        })
        .catch(error => {
            console.log(error);
        });
  };

  const handleSuccess = () => {
    setMessage("Employee information retrieved successfully!");
  }

  return (
    <div>
      {message !== "" ? <p>{message}</p>:null}
    <form onSubmit={handleSubmit}>
      <h2>Get Employee Information</h2>
      <div>
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="text"
          id="employeeId"
          name="EmpId"
          onChange={handleIdChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    {Object.keys(employee).length !== 0 ? (
      <div>
        <h3>Employee Information</h3>
        <p>Employee Id: {employee.empId}</p>
        <p>First Name: {employee.firstName}</p>
        <p>Last Name: {employee.lastName}</p>
        <p>Gender: {employee.gender}</p>
        <p>Email: {employee.emp_mailId}</p>
        <p>Phone Number: {employee.phoneNumber}</p>
        <p>Vehicle Id: {employee.vehicleId}</p>
        <p>Vehicle RegistrationNo: {employee.vehicle_RegistrationNo}</p>
        <p>Vehicle Type: {employee.vehicle_Type}</p>
        <p>Vehicle Discription: {employee.vehicle_discription}</p>
        <p>ParkingSlot No: {employee.parkingSlot_No}</p>
        <p>Parking Floor: {employee.parking_Floor}</p>
        <p>Parking Slot Status: {employee.parking_slot_status}</p>
        <p>ParkingSlot Type: {employee.parkingSlot_Type}</p>
        
      </div>
    ): null}
    </div>
  );
};

export default GetEmployeeById;

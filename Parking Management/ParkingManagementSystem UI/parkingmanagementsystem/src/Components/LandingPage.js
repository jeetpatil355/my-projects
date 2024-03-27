import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [employee, setEmployee] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [message, setMessage] = useState("");


  const handleEmployeeChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  const handleVehicleChange = (event) => {
    setVehicle({ ...vehicle, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:7082/api/Employee', {employee, vehicle})
        .then(res => {
            console.log(res.data);
            handleSuccess();
            
        })
        .catch(error => {
          console.log(employee);
          console.log(vehicle);          
            console.log(error);
        });
  };

  const handleSuccess = () => {
    setMessage("Parking slot has been successfully allocated!");
  }

  return (
    <div>
      {message !== "" ? <p>{message}</p>:null}
    <form onSubmit={handleSubmit}>
      <h2>Employee Information</h2>
      <div>
        <label htmlFor="employeeFirstName">FirstName:</label>
        <input
          type="text"
          id="employeeFirstName"
          name="firstName"
          onChange={handleEmployeeChange}
        />
      </div><div>
        <label htmlFor="employeeLastName">LastName:</label>
        <input
          type="text"
          id="employeeLastName"
          name="lastName"
          onChange={handleEmployeeChange}
        />
      </div>
      <div>
        <label htmlFor="employeeGender">Gender:</label>
        <select name="gender" id="employeeGender" onChange={handleEmployeeChange}>
            <option value="">Select a Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="employeeEmail">Email:</label>
        <input
          type="email"
          id="employeeEmail"
          name="emp_mailId"
          onChange={handleEmployeeChange}
        />
      </div>
      <div>
        <label htmlFor="employeePhoneNo">PhoneNumber:</label>
        <input
          type="number"
          id="employeePhoneNo"
          name="phoneNumber"
          onChange={handleEmployeeChange}
        />
      </div>
      <h2>Vehicle Information</h2>
    
      <div>
        <label htmlFor="vehicleNumber">Vehicle RegistrationNo:</label>
        <input
          type="text"
          id="vehicleNumber"
          name="vehicle_RegistrationNo"
          onChange={handleVehicleChange}
        />
      </div>
      <div>
        <label htmlFor="vehicleType">Vehicle Type:</label>
        <select id="vehicleType" name="vehicle_Type" onChange={handleVehicleChange}>
          <option value="">Select a type</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
        </select>
      </div>
      <div>
        <label htmlFor="vehicleDescription">Vehicle Description:</label>
        <input
          type="text"
          id="vehicleDescription"
          name="vehicle_discription"
          onChange={handleVehicleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default LandingPage;

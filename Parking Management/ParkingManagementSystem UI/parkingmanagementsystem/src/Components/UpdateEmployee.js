import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployee = ({ employee, onUpdate }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });

  const handleChange = (event) => {
    setUpdatedEmployee({
      ...updatedEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7082/api/Employee/${employee.id}`, updatedEmployee);
      onUpdate(updatedEmployee);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label htmlFor="employeeFirstName">FirstName:</label>
        <input
          type="text"
          id="employeeFirstName"
          name="firstName"
          onChange={handleChange}
        />
      </div><div>
        <label htmlFor="employeeLastName">LastName:</label>
        <input
          type="text"
          id="employeeLastName"
          name="lastName"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="employeeGender">Gender:</label>
        <select name="gender" id="employeeGender" onChange={handleChange}>
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
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="employeePhoneNo">PhoneNumber:</label>
        <input
          type="number"
          id="employeePhoneNo"
          name="phoneNumber"
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateEmployee;

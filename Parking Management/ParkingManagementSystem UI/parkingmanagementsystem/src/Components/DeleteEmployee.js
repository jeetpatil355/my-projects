import React, { useState } from 'react';
import axios from 'axios';

const DeleteEmployee = ({ id, onDelete }) => {
  const [employeeId, setEmployeeId] = useState(id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`https://localhost:7082/api/Employee/${employeeId}`);
      onDelete(employeeId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Delete Employee Information</h2>
        <div>
      <label htmlFor="employeeId">Employee ID:</label>
      <input
        type="text"
        id="employeeId"
        value={employeeId}
        onChange={(event) => setEmployeeId(event.target.value)}
      />
      </div>
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteEmployee;

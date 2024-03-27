import React, { useState, useEffect } from "react";

const GetAllEmployeeData = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("https://localhost:7082/api/Employee");
      const data = await response.json();
      setEmployeeData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Vehicle Registration No</th>
              <th>Vehicle Type</th>
              <th>Vehicle Description</th>
              <th>Parking Slot No</th>
              <th>Parking Floor</th>
              <th>Parking Slot Status</th>
              <th>Parking Slot Type</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.gender}</td>
                <td>{emp.emp_mailId}</td>
                <td>{emp.phoneNumber}</td>
                <td>{emp.vehicle_RegistrationNo}</td>
                <td>{emp.vehicle_Type}</td>
                <td>{emp.vehicle_discription}</td>
                <td>{emp.parkingSlot_No}</td>
                <td>{emp.parking_Floor}</td>
                <td>{emp.parking_slot_status}</td>
                <td>{emp.parkingSlot_Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllEmployeeData;

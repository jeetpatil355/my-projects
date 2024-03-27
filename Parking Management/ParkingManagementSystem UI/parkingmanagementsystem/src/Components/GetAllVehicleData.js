import React, { useState, useEffect } from "react";

const GetAllVehicleData = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("https://localhost:7082/api/Vehicle");
      const data = await response.json();
      setVehicleData(data);
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
              <th>Vehicle Id</th>
              <th>vehicle Registration No</th>
              <th>Vehicle Type</th>
              <th>Vehicle Discription</th>
              <th>Emp Id</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((veh) => (
              <tr key={veh.vehicleId}>
                <td>{veh.vehicleId}</td>
                <td>{veh.vehicle_RegistrationNo}</td>
                <td>{veh.vehicle_Type}</td>
                <td>{veh.vehicle_discription}</td>
                <td>{veh.empId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllVehicleData;

import React, { useState } from 'react';
import axios from 'axios';

const GetVehicleById = () => {
  const [vehicleId, setVehicleId] = useState("");
  const [vehicle, setVehicle] = useState({});
  const [message, setMessage] = useState("");

  const handleIdChange = (event) => {
    setVehicleId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://localhost:7082/api/Vehicle/${vehicleId}`)
        .then(res => {
            setVehicle(res.data);
            handleSuccess();
            
        })
        .catch(error => {
            console.log(error);
        });
  };

  const handleSuccess = () => {
    setMessage("Vehicle information retrieved successfully!");
  }

  return (
    <div>
      {message !== "" ? <p>{message}</p>:null}
    <form onSubmit={handleSubmit}>
      <h2>Get Vehicle Information</h2>
      <div>
        <label htmlFor="vehicleId">Vehicle ID:</label>
        <input
          type="text"
          id="vehicleId"
          name="vehicleId"
          onChange={handleIdChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    {Object.keys(vehicle).length !== 0 ? (
      <div>
        <h3>Vehicle Information</h3>
        <p>Vehicle Id: {vehicle.vehicleId}</p>
        <p>Vehicle Registration: {vehicle.vehicle_RegistrationNo}</p>
        <p>Vehicle Type : {vehicle.vehicle_Type}</p>
        <p>Vehicle Discription: {vehicle.vehicle_discription}</p>
        <p>Employee Id: {vehicle.empId}</p>
                
      </div>
    ): null}
    </div>
  );
};

export default GetVehicleById;

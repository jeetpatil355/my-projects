import React from 'react';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import './App.css';
import GetAllEmployeeData from './Components/GetAllEmployeeData';
import GetEmployeeById from './Components/GetEmployeeById';
import DeleteEmployee from './Components/DeleteEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetAllVehicleData from './Components/GetAllVehicleData';
import GetVehicleById from './Components/GetVehicleById';

function App() {
  return (
    <div className="LandingPage">
      <Router>
      <NavBar />
      <Routes>
      <Route path="/" element={<LandingPage/>} exact/>
      <Route path="/employee" element={<GetAllEmployeeData/>} exact/>
      <Route path="/employee/:id" element={<GetEmployeeById/>} exact/>
      <Route path="/DeleteEmployee/:id" element={<DeleteEmployee/>} exact/>
      <Route path="/UpdateEmployee/:id" element={<UpdateEmployee/>} exact/>
      <Route path="/vehicle" element={<GetAllVehicleData/>} exact/>
      <Route path="/vehicle/:id" element={<GetVehicleById/>} exact/>
      </Routes>
      </Router>
    </div>
    
  );
}

export default App;

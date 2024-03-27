import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="Navbar">
        <h1>PARKING MANAGEMENT SYSTEM</h1>
        <nav>
        <ul>
          <li>
            <Link to="/">LandingPage</Link>
          </li>
          <li>
            <Link to="/employee">GetAllEmployeeData</Link>
          </li>
          <li>
            <Link to="/employee/:id">GetEmployeeById</Link>
          </li>
          <li>
            <Link to="/DeleteEmployee/:id">DeleteEmployee</Link>
          </li>
          <li>
            <Link to="/UpdateEmployee/:id">UpdateEmployee</Link>
          </li>
          <li>
            <Link to="/vehicle">GetAllVehicleData</Link>
          </li>
          <li>
            <Link to="/vehicle/:id">GetVehicleById</Link>
          </li>
        </ul>
      </nav>
      </div>
    );
  };
  
  export default NavBar;
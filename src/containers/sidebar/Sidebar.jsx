import React from 'react';
import './sidebar.css';

import { Outlet, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/classroom">Classroom</Link>
          </li>
          <li>
            <Link to="/teaching">Teaching</Link>
          </li>
          <li>
            <Link to="/course">Course</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Sidebar
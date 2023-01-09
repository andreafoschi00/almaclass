import React from 'react';
import './dashboard.css';
import { BasicCard } from '../../containers';

import dashboardData from '../../data/DashboardData';

const Dashboard = () => {
  return (
    dashboardData.map((element, key) => <BasicCard props={element} key={key}/>));
}

export default Dashboard
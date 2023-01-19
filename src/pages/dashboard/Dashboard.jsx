import React from 'react';
import './dashboard.css';
import { BasicCard } from '../../containers';

import dashboardData from '../../data/DashboardData';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  render() {

    return(
      <div className="dashboard_container">
        {dashboardData.map((element, key) => <BasicCard props={element} key={key}/>)}
      </div>
    )
  }
}

export default Dashboard
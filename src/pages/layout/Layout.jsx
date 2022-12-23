import React, {useState} from 'react';
import './layout.css';

import { Sidebar } from './../../containers';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  return <div className='layout_container'>
    <Sidebar isOpen={ sidebarOpen } toggleSidebar={ handleViewSidebar } />
    <Outlet />
</div>;
}

export default Layout
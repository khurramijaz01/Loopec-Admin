import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar/Sidebar';
import BottomBar from './BottomBar/BottomBar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
};

export default Layout;

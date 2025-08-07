import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixed on the left */}
      <div className="fixed top-0 left-0 h-full z-50">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-[120px] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
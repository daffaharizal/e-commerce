import React from 'react';
import { Outlet } from 'react-router-dom';

import { AdminNavbar } from 'components/layouts/NavBar';
import { AdminSidebar } from 'components/layouts/SideBar';

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />

      <Outlet />
    </>
  );
};

export default AdminLayout;

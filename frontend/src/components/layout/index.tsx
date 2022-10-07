import React from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from 'components/layout/Nav';
import { ToastAlert } from 'components/shared';

const Layout: React.FC = () => {
  return (
    <>
      <Navigation />

      <ToastAlert />
      <Outlet />
    </>
  );
};

export default Layout;

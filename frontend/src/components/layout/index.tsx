import React from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from 'components/layout/Nav';

const Layout: React.FC = () => {
  return (
    <>
      <Navigation />

      <Outlet />
    </>
  );
};

export default Layout;

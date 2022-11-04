import React from 'react';

import { Outlet } from 'react-router-dom';

import { CommerceNavbar } from 'components/layouts/NavBar';
import { ToastAlert } from 'components/shared';

const CommerceLayout: React.FC = () => {
  return (
    <>
      <CommerceNavbar />

      <ToastAlert />
      <Outlet />
    </>
  );
};

export default CommerceLayout;

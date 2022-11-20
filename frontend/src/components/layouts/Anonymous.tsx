import React from 'react';

import { Outlet } from 'react-router-dom';

import { CommerceNavbar } from 'components/layouts/NavBar';
import { ToastAlert } from 'components/shared';

import { AuthConsumer } from 'context';

const AnonymousLayout: React.FC = () => {
  const { isAuth } = AuthConsumer();
  return (
    <>
      {isAuth && <CommerceNavbar />}

      <ToastAlert />
      <Outlet />
    </>
  );
};

export default AnonymousLayout;

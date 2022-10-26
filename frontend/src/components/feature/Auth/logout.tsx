import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthConsumer } from 'context';
import axios from 'axios';

export default function LogoutPage() {
  const { setAuthUser } = AuthConsumer();

  const navigate = useNavigate();

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  const handleLogOut = async () => {
    await axios.get(`http://${serverURL}/api/v1/auth/logout/`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    localStorage.removeItem('authUser');
    setAuthUser({ isAuth: false });
    navigate('/products');
  };

  return (
    <a
      onClick={() => {
        void handleLogOut();
      }}
      className="dropdown-item">
      Sign out
    </a>
  );
}

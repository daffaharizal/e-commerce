import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ROUTES from 'constant/routes';

import { AuthConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

export default function LogoutPage() {
  const navigate = useNavigate();
  const { setAuthUser } = AuthConsumer();

  const logout = async () => {
    return await axiosCreate({
      axiosApi: '/auth/logout'
    });
  };

  // Mutations
  const { mutate } = useMutation(logout);

  const handleLogOut = () => {
    mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem('authUser');
        setAuthUser({ isAuth: false });
        navigate(ROUTES.PRODUCTS);
        toast('🚀 Logout Sucessfully!');
      },
      onError: (error) => {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) {
          axiosError(error as IErrorResponse);
        }
      }
    });
  };

  return (
    <a
      onClick={() => {
        void handleLogOut();
      }}
      className="dropdown-item">
      <AiOutlineLogout size={20} />
      <span className="ps-2">Sign Out</span>
    </a>
  );
}

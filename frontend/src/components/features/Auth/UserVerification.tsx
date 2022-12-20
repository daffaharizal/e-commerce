import React from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Spinner } from 'components/shared';

import ROUTES from 'constant/routes';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

type VerifyLinkType = {
  userId: string;
  code: string;
};

export default function UserVerificationPage() {
  const navigate = useNavigate();
  const { userId, code } = useParams<VerifyLinkType>();

  const verifyUser = async (axiosData: VerifyLinkType) => {
    return await axiosCreate({
      axiosApi: '/auth/verify-user',
      axiosData,
      axiosMethod: 'POST'
    });
  };

  // validating verify user account
  const { mutate, isLoading } = useMutation(verifyUser);

  React.useEffect(() => {
    if (userId && code) {
      mutate(
        { userId, code },
        {
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
              axiosError(error as IErrorResponse);
            }
            navigate(ROUTES.LOGIN);
          },
          onSuccess: () => {
            toast('Account Verified. Please Login!');
            navigate(ROUTES.LOGIN);
          }
        }
      );
    }
  }, []);

  return <>{isLoading && <Spinner />}</>;
}

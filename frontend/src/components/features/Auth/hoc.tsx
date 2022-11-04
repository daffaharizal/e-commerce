import React from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse, IReactRouterLocation } from 'types';

import { IAuthProps, IAuthResponse, IFormInput } from './types';

const withAuth =
  (axiosApi: string) =>
  <P extends object>(Component: React.ComponentType<P & IAuthProps>) =>
  (props: P) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      clearErrors
    } = useForm<Partial<IFormInput>>();

    const { setAuthUser } = AuthConsumer();
    const navigate = useNavigate();
    const location = useLocation() as IReactRouterLocation;

    const authentication = async (axiosData: Partial<IFormInput>) => {
      return await axiosCreate<IAuthResponse>({
        axiosApi,
        axiosData,
        axiosMethod: 'POST'
      });
    };

    // Mutations
    const { mutate, isLoading } = useMutation(authentication);

    const handleOnSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      clearErrors();
      void handleSubmit(handleAuthentication)();
    };

    const handleAuthentication: SubmitHandler<Partial<IFormInput>> = (
      values
    ) => {
      mutate(values, {
        onSuccess: (user) => {
          localStorage.setItem(
            'authUser',
            JSON.stringify({ isAuth: true, ...user })
          );
          setAuthUser({ isAuth: true, ...user });

          const redirectPath = location.state
            ? location.state.from
            : '/products';

          navigate(redirectPath);
          toast('🚀 Login Sucessfully!');
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
      <Component
        {...{ ...props, errors, handleOnSubmit, isLoading, register }}
      />
    );
  };

export default withAuth;

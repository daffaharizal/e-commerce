import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { AuthConsumer } from 'context';
import { axiosCreate, axiosError } from 'helpers';
import { IErrorResponse, IReactRouterLocation } from 'types';
import { IAuthResponse, IAuthProps, IFormInput } from './types';

const withAuth =
  (axiosApi: string) =>
  <P extends object>(Component: React.ComponentType<P & IAuthProps>) =>
  (props: P) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      clearErrors
    } = useForm<IFormInput>({
      defaultValues: {
        email: 'ajithpmohan90@gmail.com',
        fullName: 'AJITH P MOHAN',
        password: 'abc12345'
      }
    });

    const { setAuthUser } = AuthConsumer();
    const navigate = useNavigate();
    const location = useLocation() as IReactRouterLocation;

    const authentication = async (axiosData: IFormInput) => {
      return await axiosCreate<IAuthResponse>({
        axiosApi,
        axiosData,
        axiosMethod: 'POST'
      });
    };

    // Mutations
    const { mutate } = useMutation(authentication);

    const handleOnSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      clearErrors();
      void handleSubmit(handleAuthentication)();
    };

    const handleAuthentication: SubmitHandler<IFormInput> = (values) => {
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
        {...props}
        register={register}
        errors={errors}
        handleOnSubmit={handleOnSubmit}
      />
    );
  };

export default withAuth;

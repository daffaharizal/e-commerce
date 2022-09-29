import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthConsumer } from 'context/auth';
import { IErrorResponse } from 'types';
import { IAuthResponse, IAuthProps, IFormInput, IWithAuth } from './types';

const withAuth =
  ({ serverUrl }: IWithAuth) =>
  <P extends object>(Component: React.ComponentType<P & IAuthProps>) =>
  (props: P) => {
    const {
      register,
      handleSubmit,
      setError,
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

    const [data, setData] = useState<IFormInput>();

    useEffect(() => {
      const submitData = async () => {
        try {
          const res: IAuthResponse = await axios.post(serverUrl, data, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          });
          localStorage.setItem(
            'authUser',
            JSON.stringify({ isAuth: true, ...res.data })
          );
          setAuthUser({ isAuth: true, ...res.data });

          navigate('/products');
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            const {
              response: {
                data: { msg }
              }
            } = error as IErrorResponse;
            setError('serverError', { type: 'custom', message: msg });
          }
        }
      };
      data && submitData();
    }, [data]);

    const handleOnSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      clearErrors();
      void handleSubmit(handleAuthentication, handleError)();
    };

    const handleAuthentication: SubmitHandler<IFormInput> = (values) => {
      setData(values);
    };

    const handleError: SubmitErrorHandler<IFormInput> = (errors) => {
      console.log('Errors --', errors);
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

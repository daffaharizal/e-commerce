import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthConsumer } from 'context/auth';
import { IErrorResponse } from 'types';
import {
  ILoginInput,
  IAuthResponse
  // ILocationState
} from './types';

import styles from 'assets/css/Auth.module.css';

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors
  } = useForm<ILoginInput>({
    defaultValues: {
      email: 'ajithpmohan90@gmail.com',
      password: 'abc12345'
    }
  });

  const { setAuthUser } = AuthConsumer();

  const navigate = useNavigate();

  // const location = useLocation() as ILocationState;

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  const [data, setData] = useState<ILoginInput>();

  useEffect(() => {
    const submitData = async () => {
      try {
        const res: IAuthResponse = await axios.post(
          `http://${serverURL}/api/v1/auth/login/`,
          data,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        );
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

  const loginOptions = {
    email: {
      required: 'This is required',
      maxLength: { value: 32, message: 'Max length is 32' }
    },
    password: {
      required: 'This is required',
      minLength: { value: 6, message: 'Min length is 6' },
      maxLength: { value: 16, message: 'Max length is 16' }
    }
  };

  const handleLogin: SubmitHandler<ILoginInput> = (values) => {
    setData(values);
  };

  const handleError: SubmitErrorHandler<ILoginInput> = (errors) => {
    console.log('Errors --', errors);
  };

  return (
    <div className={styles['card-front']}>
      <div className={styles['center-wrap']}>
        <div className={`${styles.section} text-center`}>
          <h4 className="mb-4 pb-3">Log In</h4>
          <form
            onSubmit={(...args) => {
              clearErrors();
              void handleSubmit(handleLogin, handleError)(...args);
            }}>
            <p>{errors.serverError?.message}</p>
            <div className={styles['form-group']}>
              <input
                type="email"
                {...register('email', loginOptions.email)}
                placeholder="Your Email"
                className={styles['form-style']}
              />
              <i className={`${styles['input-icon']} uil uil-at`}></i>
              <p>{errors.email?.message}</p>
            </div>
            <div className={`${styles['form-group']} mt-2`}>
              <input
                type="password"
                {...register('password', loginOptions.password)}
                placeholder="Password"
                className={styles['form-style']}
              />
              <i className={`${styles['input-icon']} uil uil-lock-alt`}></i>
              <p>{errors.password?.message}</p>
            </div>
            <button type="submit" className={`${styles['btn']} mt-4`}>
              Login
            </button>
          </form>
          <p className="mb-0 mt-4 text-center">
            <a href="#0" className={styles.link}>
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

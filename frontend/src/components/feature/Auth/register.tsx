import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthConsumer } from 'context/auth';
import { IErrorResponse } from 'types';
import { IRegisterInput, IAuthResponse } from './types';

import styles from 'assets/css/Auth.module.css';

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors
  } = useForm<IRegisterInput>({
    defaultValues: {
      email: 'ajithpmohan90@gmail.com',
      fullName: 'AJITH P MOHAN',
      password: 'abc12345'
    }
  });

  const { setAuthUser } = AuthConsumer();

  const navigate = useNavigate();

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  const [data, setData] = useState<IRegisterInput>();

  useEffect(() => {
    const submitData = async () => {
      try {
        const res: IAuthResponse = await axios.post(
          `http://${serverURL}/api/v1/auth/register/`,
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

  const registerOptions = {
    fullName: {
      required: 'This is required',
      minLength: { value: 3, message: 'Min length is 3' },
      maxLength: { value: 50, message: 'Max length is 50' }
    },
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

  const handleRegistration: SubmitHandler<IRegisterInput> = (data) => {
    setData(data);
  };

  const handleError: SubmitErrorHandler<IRegisterInput> = (errors) => {
    console.log('Errors --', errors);
  };

  return (
    <div className={styles['card-back']}>
      <div className={styles['center-wrap']}>
        <div className={`${styles.section} text-center`}>
          <h4 className="mb-4 pb-3">Sign Up</h4>
          <form
            onSubmit={(...args) => {
              clearErrors();
              void handleSubmit(handleRegistration, handleError)(...args);
            }}>
            <p>{errors.serverError?.message}</p>
            <div className={styles['form-group']}>
              <input
                {...register('fullName', registerOptions.fullName)}
                className={styles['form-style']}
                placeholder="Full Name"
              />
              <i className={`${styles['input-icon']} uil uil-user`}></i>
              <p>{errors.fullName?.message}</p>
            </div>
            <div className={`${styles['form-group']} mt-2`}>
              <input
                type="email"
                {...register('email', registerOptions.email)}
                placeholder="Enter your Email"
                className={styles['form-style']}
              />
              <i className={`${styles['input-icon']} uil uil-at`}></i>
              <p>{errors.email?.message}</p>
            </div>

            <div className={`${styles['form-group']} mt-2`}>
              <input
                type="password"
                {...register('password', registerOptions.password)}
                className={styles['form-style']}
                placeholder="Password"
              />
              <i className={`${styles['input-icon']} uil uil-lock-alt`}></i>
              <p>{errors.password?.message}</p>
            </div>
            <button type="submit" className={`${styles['btn']} mt-4`}>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

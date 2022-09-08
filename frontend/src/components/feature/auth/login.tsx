import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import axios from 'axios';
import { ILoginInput, IAuthError } from './types';

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

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  const [data, setData] = useState<ILoginInput>();

  useEffect(() => {
    const submitData = async () => {
      try {
        const result = await axios.post(
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
        localStorage.setItem('authUser', JSON.stringify(result.data));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const {
            response: {
              data: { msg }
            }
          } = error as IAuthError;
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
    <div className="card-front">
      <div className="center-wrap">
        <div className="section text-center">
          <h4 className="mb-4 pb-3">Log In</h4>
          <form
            onSubmit={(...args) => {
              clearErrors();
              void handleSubmit(handleLogin, handleError)(...args);
            }}>
            <p>{errors.serverError?.message}</p>
            <div className="form-group">
              <input
                type="email"
                {...register('email', loginOptions.email)}
                placeholder="Your Email"
                className="form-style"
              />
              <i className="input-icon uil uil-at"></i>
              <p>{errors.email?.message}</p>
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                {...register('password', loginOptions.password)}
                placeholder="Password"
                className="form-style"
              />
              <i className="input-icon uil uil-lock-alt"></i>
              <p>{errors.password?.message}</p>
            </div>
            <button type="submit" className="btn mt-4">
              Login
            </button>
          </form>
          <p className="mb-0 mt-4 text-center">
            <a href="#0" className="link">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

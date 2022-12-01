import React from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsBootstrap } from 'react-icons/bs';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LoadingSpinner } from 'components/shared';

import ROUTES from 'constant/routes';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

import styles from 'assets/css/Auth.module.css';

type FormInputType = {
  newPassword: string;
};

type VerifyLinkType = {
  userId: string;
  code: string;
};

interface PasswordResetType extends FormInputType, VerifyLinkType {}

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const { userId, code } = useParams<VerifyLinkType>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<FormInputType>();

  const options = {
    newPassword: {
      required: 'This is required',
      minLength: { value: 6, message: 'Min length is 6' },
      maxLength: { value: 16, message: 'Max length is 16' }
    }
  };

  const verifyResetLink = async (axiosData: VerifyLinkType) => {
    return await axiosCreate({
      axiosApi: '/auth/verify-password-reset-link',
      axiosData,
      axiosMethod: 'POST'
    });
  };

  // validating password reset link
  const {
    mutate: verifyLinkMutation,
    isSuccess: isResetLinkValid,
    isLoading: checkingResetLink
  } = useMutation(verifyResetLink);

  React.useEffect(() => {
    if (userId && code) {
      verifyLinkMutation(
        { userId, code },
        {
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
              axiosError(error as IErrorResponse);
            }
            navigate(ROUTES.FORGOTPASSWORD);
          }
        }
      );
    }
  }, []);

  const passwordReset = async (axiosData: PasswordResetType) => {
    return await axiosCreate({
      axiosApi: '/auth/password-reset',
      axiosData,
      axiosMethod: 'POST'
    });
  };

  // mutation
  const { mutate, isLoading } = useMutation(passwordReset);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    void handleSubmit(handleFormSubmit)();
  };

  const handleFormSubmit: SubmitHandler<FormInputType> = (values) => {
    code &&
      userId &&
      mutate(
        { ...values, code, userId },
        {
          onSuccess: () => {
            toast('🚀 Password Reset Successfully. Please Login your Account');
            navigate(ROUTES.LOGIN);
          },
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
              axiosError(error as IErrorResponse);
            }
          }
        }
      );
  };

  return (
    <>
      {checkingResetLink && <LoadingSpinner />}
      {isResetLinkValid && (
        <div className="container">
          <div className={styles.background}></div>
          <div className={styles.card}>
            <NavLink
              to={ROUTES.PRODUCTS}
              className="text-black text-decoration-none">
              <BsBootstrap className={styles.logo} size={28} />
            </NavLink>
            <h2>Password Reset</h2>
            <form onSubmit={handleOnSubmit} className={styles.form} noValidate>
              <input
                type="password"
                {...register('newPassword', options.newPassword)}
                placeholder="New Password"
              />
              {errors.newPassword && <p>{errors.newPassword.message}</p>}
              <Button
                type="submit"
                className="mt-3 text-uppercase"
                disabled={isLoading}>
                {isLoading && <LoadingSpinner />}
                Submit
              </Button>
            </form>
            <footer>
              <div className="mb-2">
                Back to <NavLink to={ROUTES.LOGIN}>login</NavLink>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordResetPage;

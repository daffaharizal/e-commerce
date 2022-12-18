import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsBootstrap } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Spinner } from 'components/shared';

import ROUTES from 'constant/routes';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

import styles from 'assets/css/Auth.module.css';

type IFormInput = {
  email: string;
};

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<IFormInput>();

  const options = {
    email: {
      required: 'This is required',
      maxLength: { value: 32, message: 'Max length is 32' }
    }
  };

  const forgotPassword = async (axiosData: IFormInput) => {
    return await axiosCreate({
      axiosApi: '/auth/forgot-password',
      axiosData,
      axiosMethod: 'POST'
    });
  };

  // Mutations
  const { mutate, isLoading } = useMutation(forgotPassword);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    void handleSubmit(handleFormSubmit)();
  };

  const handleFormSubmit: SubmitHandler<IFormInput> = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast('🚀 Email Sent Sucessfully!');
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
    <div className="container">
      <div className={styles.background}></div>
      <div className={styles.card}>
        <NavLink
          to={ROUTES.PRODUCTS}
          className="text-black text-decoration-none">
          <BsBootstrap className={styles.logo} size={28} />
        </NavLink>
        <h2>Forgot Password</h2>
        <form onSubmit={handleOnSubmit} className={styles.form} noValidate>
          <input
            type="email"
            {...register('email', options.email)}
            placeholder="Your Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <Button
            type="submit"
            className="mt-3 text-uppercase"
            disabled={isLoading}>
            {isLoading && <Spinner />}
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
  );
};

export default ForgotPasswordPage;

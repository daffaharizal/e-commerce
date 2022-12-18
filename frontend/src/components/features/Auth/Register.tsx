import Button from 'react-bootstrap/Button';
import { BsBootstrap, BsFacebook, BsGoogle, BsTwitter } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import { Spinner } from 'components/shared';

import ROUTES from 'constant/routes';

import styles from 'assets/css/Auth.module.css';

import withAuth from './WithAuth';
import { IAuthProps } from './types';

const BaseRegisterPage = ({
  isLoading,
  register,
  errors,
  handleOnSubmit
}: IAuthProps) => {
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

  return (
    <div className="container">
      <div className={styles.background}></div>
      <div className={styles.card}>
        <NavLink
          to={ROUTES.PRODUCTS}
          className="text-black text-decoration-none">
          <BsBootstrap className={styles.logo} size={28} />
        </NavLink>
        <h2>Create Account</h2>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <input
            {...register('fullName', registerOptions.fullName)}
            placeholder="Full Name"
          />
          {errors.fullName && <p>{errors.fullName?.message}</p>}
          <input
            type="email"
            {...register('email', registerOptions.email)}
            placeholder="Enter your Email"
            className="mt-2"
          />
          {errors.email && <p>{errors.email?.message}</p>}
          <input
            type="password"
            {...register('password', registerOptions.password)}
            placeholder="Password"
            className="mt-2"
          />
          {errors.password && <p>{errors.password?.message}</p>}
          <Button
            type="submit"
            className="mt-3 text-uppercase"
            disabled={isLoading}>
            {isLoading && <Spinner />}
            Register
          </Button>
        </form>
        <footer>
          <div className="mb-2">or sign up with:</div>
          <div className="mb-4">
            <BsFacebook size={24} className="me-4" />
            <BsGoogle size={24} className="me-4" />
            <BsTwitter size={24} />
          </div>
          <div>
            Existing users, login <NavLink to={ROUTES.LOGIN}>here</NavLink>
          </div>
        </footer>
      </div>
    </div>
  );
};

const RegisterPage = withAuth('/auth/register')(BaseRegisterPage);

export default RegisterPage;

import Button from 'react-bootstrap/Button';
import { BsBootstrap } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import { Spinner } from 'components/shared';

import ROUTES from 'constant/routes';

import styles from 'assets/css/Auth.module.css';

import withAuth from './WithAuth';
import { IAuthProps } from './types';

const BaseLoginPage = ({
  isLoading,
  register,
  errors,
  handleOnSubmit
}: IAuthProps) => {
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

  return (
    <div className="container">
      <div className={styles.background}></div>
      <div className={styles.card}>
        <NavLink
          to={ROUTES.PRODUCTS}
          className="text-black text-decoration-none">
          <BsBootstrap className={styles.logo} size={28} />
        </NavLink>
        <h2>Login Account</h2>
        <form onSubmit={handleOnSubmit} className={styles.form} noValidate>
          <input
            type="email"
            {...register('email', loginOptions.email)}
            placeholder="Your Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            {...register('password', loginOptions.password)}
            placeholder="Password"
            className="mt-2"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <Button
            type="submit"
            className="mt-3 text-uppercase"
            disabled={isLoading}>
            {isLoading && <Spinner />} Login
          </Button>
        </form>
        <footer>
          <div className="mb-2">
            Not a member? Register <NavLink to={ROUTES.REGISTER}>here</NavLink>
          </div>
          <div>
            <NavLink to={ROUTES.FORGOTPASSWORD}>Forgot your password?</NavLink>
          </div>
        </footer>
      </div>
    </div>
  );
};

const LoginPage = withAuth('/auth/login')(BaseLoginPage);

export default LoginPage;

import Button from 'react-bootstrap/Button';

import { LoadingSpinner } from 'components/shared';

import styles from 'assets/css/Auth.module.css';

import withAuth from './hoc';
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
    <div className={styles['card-front']}>
      <div className={styles['center-wrap']}>
        <div className={`${styles.section} text-center`}>
          <h4 className="mb-4 pb-3">Log In</h4>
          <form onSubmit={handleOnSubmit}>
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
            <Button
              type="submit"
              className={`${styles['btn']} mt-4`}
              disabled={isLoading}>
              {isLoading && <LoadingSpinner />}
              Login
            </Button>
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

const LoginPage = withAuth('/auth/login')(BaseLoginPage);

export default LoginPage;

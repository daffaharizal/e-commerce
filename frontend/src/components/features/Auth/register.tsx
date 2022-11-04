import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import styles from 'assets/css/Auth.module.css';

import withAuth from './hoc';
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
    <div className={styles['card-back']}>
      <div className={styles['center-wrap']}>
        <div className={`${styles.section} text-center`}>
          <h4 className="mb-4 pb-3">Sign Up</h4>
          <form onSubmit={handleOnSubmit}>
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
            <Button
              type="submit"
              className={`${styles['btn']} mt-4`}
              disabled={isLoading}>
              {isLoading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const RegisterPage = withAuth('/auth/register')(BaseRegisterPage);

export default RegisterPage;

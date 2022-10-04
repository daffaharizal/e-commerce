import React, { useEffect } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

import { callAxios } from 'helpers';

import { IUserProfile, IUserProfileResponse } from './types';
import { IErrorResponse } from 'types';
import { DatePicker } from 'react-rainbow-components';

import styles from 'assets/css/Profile.module.css';
import moment from 'moment';

export default function ProfilePage() {
  const [dateOfBirth, setdateOfBirth] = React.useState<Date | undefined>();

  const onDOBChange = (value: Date) => {
    setdateOfBirth(value);
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    clearErrors
  } = useForm<IUserProfile>({
    defaultValues: {}
  });

  useEffect(() => {
    void (async () => {
      try {
        const res = await callAxios<IUserProfileResponse>({
          axiosApi: '/users/showme'
        });

        const {
          user: { fullName, email, dateOfBirth }
        } = res as IUserProfileResponse;

        setdateOfBirth(new Date(dateOfBirth || new Date(2009, 11, 31)));

        reset({ fullName, email });
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
    })();
  }, []);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    void handleSubmit(handleOnSubmit, handleError)();
  };

  const handleOnSubmit: SubmitHandler<IUserProfile> = (values) => {
    void (async () => {
      try {
        await callAxios<IUserProfileResponse>({
          axiosApi: '/users/update-user',
          axiosMethod: 'POST',
          axiosData: {
            ...values,
            dateOfBirth: moment(dateOfBirth).format('YYYY/MM/DD')
          }
        });
        toast('🚀 Profile Updated!');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const {
            response: {
              data: { msg }
            }
          } = error as IErrorResponse;
          setError('serverError', { type: 'custom', message: msg });
          toast('Error Occurred. Try Again!');
        }
      }
    })();
  };

  const handleError: SubmitErrorHandler<IUserProfile> = (errors) => {
    console.log('Errors --', errors);
  };

  const formOptions = {
    email: {
      required: 'This is required',
      maxLength: { value: 32, message: 'Max length is 32' }
    },
    fullName: {
      required: 'This is required',
      minLength: { value: 3, message: 'Min length is 3' },
      maxLength: { value: 50, message: 'Max length is 50' }
    }
  };

  return (
    <div
      className="modal modal-signin position-static d-block py-5"
      tabIndex={-1}
      role="dialog"
      id="modalSignin">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h3 className="fw-bold mb-0">Update Profile</h3>
          </div>
          <div className="modal-body p-5 pt-0">
            <form onSubmit={onSubmit}>
              <p>{errors.serverError?.message}</p>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  {...register('fullName', formOptions.email)}
                  className="form-control rounded-3"
                  placeholder="Your name"
                />
                <label htmlFor="floatingInput">Full Name</label>
                <p>{errors.fullName?.message}</p>
              </div>
              <div className="form-floating">
                <input
                  type="email"
                  {...register('email', formOptions.email)}
                  className="form-control rounded-3"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
                <p>{errors.email?.message}</p>
              </div>
              <div className="form-floating mb-3">
                <DatePicker
                  required
                  value={dateOfBirth}
                  onChange={onDOBChange}
                  minDate={new Date(1950, 0, 1)}
                  maxDate={new Date(2009, 11, 31)}
                  formatStyle="medium"
                  className={`form-control rounded-3 ${styles.dob}`}
                />
                <label htmlFor="floatingInput">Date of Birth</label>
                {/* <p>{errors.email?.message}</p> */}
              </div>

              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary mt-3"
                type="submit">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

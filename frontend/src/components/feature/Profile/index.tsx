import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DatePicker } from 'react-rainbow-components';
import { toast } from 'react-toastify';

// import { QueryConsumer } from 'context';
import { callAxios, axiosError } from 'helpers';

import { IErrorResponse } from 'types';
import { IUserProfile, IUserProfileResponse } from './types';

import styles from 'assets/css/Profile.module.css';

export default function ProfilePage() {
  const [dateOfBirth, setdateOfBirth] = React.useState<Date | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors
  } = useForm<IUserProfile>({
    defaultValues: {}
  });

  const getProfile = async () => {
    const res = await callAxios<IUserProfileResponse>({
      axiosApi: '/users/showme'
    });
    const {
      user: { fullName, email, dateOfBirth }
    } = res as IUserProfileResponse;

    // set date state hook with fetched data
    setdateOfBirth(new Date(dateOfBirth || new Date(2009, 11, 31)));

    // set react-hook-form with fetched data
    reset({ fullName, email });

    return { fullName, email, dateOfBirth };
  };

  const updateProfile = async (axiosData: IUserProfile) => {
    return await callAxios<IUserProfileResponse>({
      axiosApi: '/users/update-user',
      axiosMethod: 'POST',
      axiosData
    });
  };

  // Access the client
  // const queryClient = QueryConsumer();

  // Queries
  const { isLoading, isError } = useQuery(['profile'], getProfile, {
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    },
    refetchOnWindowFocus: false
    // refetchIntervalInBackground: false,
    // refetchOnMount: false
  });

  // Mutations
  const mutation = useMutation(updateProfile, {
    onSuccess: () => {
      // Invalidate and refetch
      // await queryClient.invalidateQueries(['profile']);
      toast('🚀 Profile Updated!');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    }
  });

  const onDOBChange = (value: Date) => {
    setdateOfBirth(value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    void handleSubmit(handleOnSubmit)();
  };

  const handleOnSubmit: SubmitHandler<IUserProfile> = (values) => {
    mutation.mutate({
      ...values,
      dateOfBirth: moment(dateOfBirth).format('YYYY/MM/DD')
    });
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

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>An Error Occured!</span>;

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
            <form onSubmit={onSubmit} noValidate>
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

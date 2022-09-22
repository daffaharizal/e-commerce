import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import { UserRatingForm } from 'components/shared';
import { ProductConsumer } from 'context/product';
import { IErrorResponse } from 'types';
import { IReviewForm } from './types';

import axios from 'axios';

export default function UserReviewForm() {
  const { productId } = ProductConsumer();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors
  } = useForm<IReviewForm>({
    defaultValues: {
      product: productId,
      rating: 0
    }
  });

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  const [data, setData] = React.useState<IReviewForm>();
  const [rating, setRating] = React.useState<number>(0);

  React.useEffect(() => {
    const submitForm = async () => {
      try {
        await axios.post(`http://${serverURL}/api/v1/reviews/`, data, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
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
    data && submitForm();
  }, [data]);

  const formOptions = {
    title: {
      required: 'This is required',
      maxLength: { value: 16, message: 'Max length is 16' }
    },
    comment: {
      required: 'This is required',
      minLength: { value: 8, message: 'Min length is 8' },
      maxLength: { value: 2048, message: 'Max length is 2048' }
    }
  };

  const handleFormSubmit: SubmitHandler<IReviewForm> = (values) => {
    setData({ ...values, rating });
  };

  const handleFormError: SubmitErrorHandler<IReviewForm> = (errors) => {
    console.log('Errors --', errors);
  };

  return (
    <form
      className="review-form"
      onSubmit={(...args) => {
        clearErrors();
        void handleSubmit(handleFormSubmit, handleFormError)(...args);
      }}>
      <div className="card mb-4">
        <h5 className="card-header text-dark py-3">Write a Product Review</h5>
        <div className="card-body">
          <h5 className="card-title pb-4 tex-dark">
            <label>Overall rating</label>
            <UserRatingForm disabled={false} setRating={setRating} />
            <p className="text-danger">{errors.rating?.message}</p>
          </h5>
          <div className="card-text">
            <div className="form-group pb-4 text-dark">
              <label htmlFor="title">Add a headline</label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="What's most important to know?"
                {...register('title', formOptions.title)}
              />
              <p className="text-danger">{errors.title?.message}</p>
            </div>
            <div className="form-group text-dark">
              <label htmlFor="comment">Add a written review</label>
              <textarea
                className="form-control"
                id="comment"
                rows={10}
                placeholder="What did you like or dislike? What did you use this product for?"
                {...register('comment', formOptions.comment)}
              />
              <p className="text-danger">{errors.comment?.message}</p>
            </div>
            <p className="text-danger">{errors.serverError?.message}</p>
            <button className="round-black-btn">Submit Review</button>
          </div>
        </div>
      </div>
    </form>
  );
}

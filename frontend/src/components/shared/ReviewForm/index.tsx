import React from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { UserRating } from 'components/shared';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

import { IReviewForm } from './types';

type ReviewFormPropsType<T> = {
  axiosApi: string;
  reviewItem: T;
};

export default function UserReviewForm<T>({
  axiosApi,
  reviewItem
}: ReviewFormPropsType<T>) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<IReviewForm>({
    defaultValues: {
      rating: 0,
      title: 'Awesome',
      comment:
        'Its nice one... Quality wise, size wise perfect. After using more than one moth, i must say that, this is the best one ever purchased this category'
    }
  });

  const formOptions = {
    rating: {
      required: 'This field is required',
      min: { value: 1, message: 'Please provide the overall rating' },
      max: { value: 5, message: 'Please provide the overall rating' }
    },
    title: {
      required: 'This field is required',
      maxLength: { value: 16, message: 'Max length is 16' }
    },
    comment: {
      required: 'This field is required',
      minLength: { value: 8, message: 'Min length is 8' },
      maxLength: { value: 2048, message: 'Max length is 2048' }
    }
  };

  const submitReview = async (axiosData: IReviewForm) => {
    return await axiosCreate({
      axiosApi,
      axiosData: { ...axiosData, ...reviewItem },
      axiosMethod: 'POST'
    });
  };

  // Mutations
  const { mutate, isLoading } = useMutation(submitReview);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    void handleSubmit(handleOnSubmit)();
  };

  const handleOnSubmit: SubmitHandler<IReviewForm> = (values) => {
    mutate(values, {
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          axiosError(error as IErrorResponse);
        }
      }
    });
  };

  return (
    <form className="review-form" onSubmit={handleFormSubmit}>
      <div className="card mb-4">
        <h5 className="card-header text-dark py-3">Write a Review</h5>
        <div className="card-body">
          <h5 className="card-title pb-4 tex-dark">
            <label>Overall rating</label>
            <Controller
              name="rating"
              control={control}
              rules={formOptions.rating}
              render={({ field }) => (
                <UserRating
                  emoji={true}
                  readonly={false}
                  handleClick={field.onChange}
                />
              )}
            />

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
            <button className="round-black-btn" disabled={isLoading}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

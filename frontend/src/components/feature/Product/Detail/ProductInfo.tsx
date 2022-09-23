import React from 'react';

import { UserReviewCard, UserReviewForm } from 'components/shared';
import { IProductItemProps, IProductReviews } from '../types';
import { AuthConsumer } from 'context/auth';

export default function ProductInfo({ product }: IProductItemProps) {
  const [reviews, setReviews] = React.useState<IProductReviews[]>(
    product.reviews
  );
  const {
    isAuth,
    user: { _id: userId }
  } = AuthConsumer();

  const isCurrentUserReviewed = reviews.some(
    (review) => review.user._id === userId
  );

  return (
    <div className="product-info-tabs">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="description-tab"
            data-bs-toggle="tab"
            data-bs-target="#description"
            type="button"
            role="tab"
            aria-controls="description"
            aria-selected="true">
            Description
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="review-tab"
            data-bs-toggle="tab"
            data-bs-target="#review"
            type="button"
            role="tab"
            aria-controls="review"
            aria-selected="false">
            Reviews ({product.numOfReviews})
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
          aria-labelledby="description-tab">
          {product.description}
        </div>
        <div
          className="tab-pane fade"
          id="review"
          role="tabpanel"
          aria-labelledby="review-tab">
          <h3 className="fw-bold text-dark">Top Reviews</h3>
          {reviews.map((review, index) => (
            <UserReviewCard review={review} key={index} />
          ))}

          {reviews.length === 0 && (
            <p className="mb-4">There are no reviews yet.</p>
          )}
          {isAuth && !isCurrentUserReviewed && (
            <UserReviewForm setReviews={setReviews} />
          )}
        </div>
      </div>
    </div>
  );
}

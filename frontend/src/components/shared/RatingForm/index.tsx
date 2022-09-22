import React from 'react';
import styles from 'assets/css/UserRating.module.css';

import { IUserRatingProps } from './types';

export default function UserRatingForm({
  id = '',
  star = 0,
  totalReviews = 0,
  disabled = true,
  setRating
}: IUserRatingProps) {
  const ratings = [5, 4, 3, 2, 1];
  const [data, setData] = React.useState(star);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(+event.target.value);
    setRating && setRating(+event.target.value);
  };

  return (
    <div className={styles['reviews-counter']}>
      <div className={styles.rate}>
        {ratings.map((rating, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              name={`rate${id}`}
              id={`star${rating}${id}`}
              defaultChecked={rating === data ? true : false}
              value={rating}
              onChange={handleChange}
              disabled={disabled}
            />
            <label htmlFor={`star${rating}${id}`} title="text">
              {rating} stars
            </label>
          </React.Fragment>
        ))}
      </div>
      {!!totalReviews && <span>{totalReviews} Reviews</span>}
    </div>
  );
}

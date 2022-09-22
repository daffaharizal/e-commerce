import styles from 'assets/css/UserRating.module.css';

export default function UserRatingForm({
  rid,
  star = 0,
  totalReviews = 0
}: {
  rid: number;
  star?: number;
  totalReviews?: number;
}) {
  return (
    <div className={styles['reviews-counter']}>
      <div className={styles.rate}>
        <input
          type="radio"
          id={`${rid}_star5`}
          defaultChecked={star === 5 ? true : false}
        />
        <label htmlFor={`${rid}_star5`} title="text">
          5 stars
        </label>
        <input
          type="radio"
          id={`${rid}_star4`}
          defaultChecked={star === 4 ? true : false}
        />
        <label htmlFor={`${rid}_star4`} title="text">
          4 stars
        </label>
        <input
          type="radio"
          id={`${rid}_star3`}
          defaultChecked={star === 3 ? true : false}
        />
        <label htmlFor={`${rid}_star3`} title="text">
          3 stars
        </label>
        <input
          type="radio"
          id={`${rid}_star2`}
          defaultChecked={star === 2 ? true : false}
        />
        <label htmlFor={`${rid}_star2`} title="text">
          2 stars
        </label>
        <input
          type="radio"
          id={`${rid}_star1`}
          defaultChecked={star === 1 ? true : false}
        />
        <label htmlFor={`${rid}_star1`} title="text">
          1 star
        </label>
      </div>
      {!!totalReviews && <span>{totalReviews} Reviews</span>}
    </div>
  );
}

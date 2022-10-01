import { FaUser } from 'react-icons/fa';

import { IProductReviews } from 'components/feature/Product/types';
import { UserRatingForm } from 'components/shared';

export default function UserReviewCard({
  review: {
    id,
    rating,
    title,
    comment,
    user: { fullName }
  }
}: {
  review: IProductReviews;
}) {
  return (
    <div className="card mb-4">
      <h5 className="card-header text-dark py-3">
        <FaUser size={20} />
        <span className="ps-2">{fullName}</span>
      </h5>
      <div className="card-body">
        <h5 className="card-title">
          <UserRatingForm id={id} star={rating} />
          {title}
        </h5>
        <p className="card-text">{comment}</p>
      </div>
    </div>
  );
}

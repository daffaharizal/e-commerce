import * as Icons from 'react-bootstrap-icons';
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
        <Icons.Person color="black" size={20} /> {fullName}
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

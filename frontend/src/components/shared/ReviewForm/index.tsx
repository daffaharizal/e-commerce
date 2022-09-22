import { UserRatingForm } from 'components/shared';

export default function UserReviewForm() {
  return (
    <form className="review-form">
      <div className="card mb-4">
        <h5 className="card-header text-dark py-3">Write a Product Review</h5>
        <div className="card-body">
          <h5 className="card-title pb-4 tex-dark">
            <label>Overall rating</label>
            <UserRatingForm rid={233} />
          </h5>
          <p className="card-text">
            <div className="form-group pb-4 text-dark">
              <label htmlFor="headline">Add a headline</label>
              <input
                type="text"
                id="headline"
                className="form-control"
                placeholder="What's most important to know?"
              />
            </div>
            <div className="form-group text-dark">
              <label htmlFor="comment">Add a written review</label>
              <textarea
                className="form-control"
                id="comment"
                rows={10}
                placeholder="What did you like or dislike? What did you use this product for?"></textarea>
            </div>
            <button className="round-black-btn">Submit Review</button>
          </p>
        </div>
      </div>
    </form>
  );
}

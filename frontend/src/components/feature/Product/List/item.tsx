import { Link } from 'react-router-dom';

import { StyledButton, UserRatingForm } from 'components/shared';

import NoImage from 'assets/images/noproductimage.png';

import { IProductItemProps } from '../types';

export default function ProductItem({ product }: IProductItemProps) {
  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  return (
    <div className="col-lg-4 col-md-6">
      <div className="card">
        {product.images.length > 0 ? (
          <img
            src={`http://${serverURL}${product.images[0].url}`}
            className="card-img-top vh-35"
            alt={product.images[0].name}
          />
        ) : (
          <img src={NoImage} className="card-img-top vh-35" alt="noimage" />
        )}
        <div className="card-body border-bottom">
          <h5 className="card-title d-flex justify-content-between text-capitalize">
            <Link to={product.id} className="text-success text-decoration-none">
              {product.name}
            </Link>
            <span className="fw-bold text-danger">${product.price}</span>
          </h5>
          <p className="card-text mb-1 mt-1 fs-0">{product.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between text-capitalize text-black">
            <UserRatingForm
              id={product.id}
              star={product.averageRating}
              numOfReviews={product.numOfReviews}
            />
            <span>{product.category}</span>
          </li>
        </ul>
        <div className="card-body">
          <div className="buttons text-end">
            <StyledButton className="btn btn-outline-dark text-uppercase">
              Add to Wishlist
            </StyledButton>
            <StyledButton className="btn btn-dark text-uppercase">
              Add to Cart
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}

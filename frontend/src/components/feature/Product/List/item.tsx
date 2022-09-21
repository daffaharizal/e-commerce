import { Link } from 'react-router-dom';

import { StyledButton } from 'components/shared';
import { iProductItemProps } from '../types';

import styles from 'assets/css/ProductList.module.css';
import NoImage from 'assets/images/noproductimage.png';

export default function ProductItem({ product }: iProductItemProps) {
  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  return (
    <div className="col-md-4">
      <div className={`${styles.card} bg-white`}>
        {product.images.length > 0 ? (
          <img
            src={`http://${serverURL}${product.images[0].url}`}
            className="card-img-top"
            alt={product.images[0].name}
          />
        ) : (
          <img src={NoImage} className="card-img-top" alt="noimage" />
        )}
        <div className={styles['card-body']}>
          <div className="d-flex justify-content-between">
            <span className={styles['font-weight-bold']}>
              <Link to={product.id}>{product.name}</Link>
            </span>
            <span className={styles['font-weight-bold']}>${product.price}</span>
          </div>
          <p className={`${styles['card-text']} mb-1 mt-1`}>
            {product.description}
          </p>
          <div className="d-flex align-items-center flex-row">
            <img src="https://i.imgur.com/e9VnSng.png" width="20" />
            <span className="guarantee">2 Years Guarantee</span>
          </div>
        </div>
        <hr />
        <div className={styles['card-body']}>
          <div className={`${styles['buttons']} text-end`}>
            <StyledButton className="btn btn-outline-dark">
              Add to Wishlist
            </StyledButton>
            <StyledButton className="btn btn-dark">Add to Cart</StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}

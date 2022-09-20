import { Link } from 'react-router-dom';

import { iProductItemProps } from '../types';
import styles from 'assets/css/ProductList.module.css';

import { StyledButton } from 'components/shared';

export default function ProductItem({ product }: iProductItemProps) {
  return (
    <div className="col-md-4">
      <div className={`${styles.card} bg-white`}>
        <img src={product.image} className="card-img-top" />
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

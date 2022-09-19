import { Link } from 'react-router-dom';

import { iProductItemProps } from '../types';
import styles from 'assets/css/ProductList.module.css';

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
            <button className="btn btn-outline-dark">add to wishlist</button>
            <button className="btn btn-dark">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

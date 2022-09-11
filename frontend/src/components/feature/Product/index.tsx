import React from 'react';
import axios from 'axios';

import { iProduct, iProductResponse } from './types';

import 'font-awesome/css/font-awesome.min.css';
import styles from 'assets/css/Product.module.css';

export default function ProductPage() {
  const [products, setProducts] = React.useState<iProduct[]>([]);

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  React.useEffect(() => {
    const fetchProduct = async () => {
      const res: iProductResponse = await axios.get(
        `http://${serverURL}/api/v1/products/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      const {
        data: { products }
      } = res;
      setProducts(products);
    };
    products.length === 0 && fetchProduct();
  }, []);

  return (
    <div>
      <div className="container-fluid mt-2 mb-5">
        <div className={styles.products}>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab">
              <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
                <span
                  className={`${styles['font-weight-bold']} text-uppercase`}>
                  Products
                </span>
                <div>
                  <img
                    src="https://img.icons8.com/windows/100/000000/list.png"
                    width="30"
                  />
                  <img
                    src="https://img.icons8.com/ios-filled/100/000000/squared-menu.png"
                    width="25"
                  />
                </div>
              </div>
              <div className="row g-3">
                {products.map((product) => (
                  <div className="col-md-4" key={product.id}>
                    <div className={styles.card}>
                      <img src={product.image} className="card-img-top" />
                      <div className={styles['card-body']}>
                        <div className="d-flex justify-content-between">
                          <span className={styles['font-weight-bold']}>
                            {product.name}
                          </span>
                          <span className={styles['font-weight-bold']}>
                            ${product.price}
                          </span>
                        </div>
                        <p className={`${styles['card-text']} mb-1 mt-1`}>
                          {product.description}
                        </p>
                        <div className="d-flex align-items-center flex-row">
                          <img
                            src="https://i.imgur.com/e9VnSng.png"
                            width="20"
                          />
                          <span className="guarantee">2 Years Guarantee</span>
                        </div>
                      </div>
                      <hr />
                      <div className={styles['card-body']}>
                        <div className={`${styles['buttons']} text-end`}>
                          <button className="btn btn-outline-dark">
                            add to wishlist
                          </button>
                          <button className="btn btn-dark">Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

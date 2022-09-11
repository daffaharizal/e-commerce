import React from 'react';
import axios from 'axios';

import { iProduct, iProductResponse } from './types';

import 'font-awesome/css/font-awesome.min.css';
import styles from 'assets/css/Product.module.css';
import ProductItem from './item';

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
      <div className="container-lg mt-2 mb-5">
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
                  <ProductItem product={product} key={product.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import axios from 'axios';

import ProductItem from './item';
import { IProduct, IProductListResponse } from '../types';

export default function ProductListPage() {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  React.useEffect(() => {
    const fetchProduct = async () => {
      const res: IProductListResponse = await axios.get(
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
    <div className="container-lg mb-5">
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab">
          <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
            <span className="fw-bold text-uppercase">New Product</span>
          </div>
          <div className="row g-3">
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

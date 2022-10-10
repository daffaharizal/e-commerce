import React from 'react';
import axios from 'axios';

import { CartConsumer } from 'context';
import ProductItem from './item';
import { IProduct, IProductListResponse } from '../types';

export default function ProductListPage() {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  const [cart, cartDispatch] = CartConsumer();
  console.log(cart);

  const handleAddToCart = (product: IProduct) => {
    const lineItemExist = cart.lineItems.some(
      (lineItem) => lineItem.itemId === product.id
    );

    const actionType = lineItemExist ? 'UPDATE_LINE_ITEM' : 'ADD_LINE_ITEM';
    const quantity = lineItemExist
      ? cart.lineItems
          .filter((lineItem) => lineItem.itemId === product.id)
          .reduce((accumulator, lineItem) => accumulator + lineItem.quantity, 1)
      : 1;

    cartDispatch({
      type: actionType,
      payload: {
        itemId: product.id,
        item: product,
        quantity,
        discount: 0,
        price: product.price
      }
    });
  };

  React.useEffect(() => {
    const fetchProduct = async () => {
      const res: IProductListResponse = await axios.get(
        `http://${serverUrl}/api/v1/products/`,
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
              <ProductItem
                key={product.id}
                product={product}
                serverUrl={serverUrl}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

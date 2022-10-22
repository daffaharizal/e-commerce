import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import { useQuery } from '@tanstack/react-query';

import { CartConsumer } from 'context';
import { axiosCreate, axiosError } from 'helpers';
import { IErrorResponse } from 'types';
import ProductItem from './item';
import { IProduct, IProductsResponse } from '../types';

export default function ProductListPage() {
  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  const [cart, cartDispatch] = CartConsumer();

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

  const fetchProducts = async () => {
    const res = await axiosCreate<IProductsResponse>({
      axiosApi: '/products'
    });

    const { products } = res as IProductsResponse;

    return products;
  };

  // Queries
  const {
    data: products,
    isLoading,
    isError
  } = useQuery(['products'], fetchProducts, {
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    },
    refetchOnWindowFocus: false
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>An Error Occured!</span>;

  return (
    <Container fluid="lg" className="mb-5">
      <TabContent id="myTabContent">
        <TabPane active aria-labelledby="products-tab">
          <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
            <span className="fw-bold text-uppercase">New Product</span>
          </div>
        </TabPane>
      </TabContent>
      <Row lg={3} md={2} sm={2} xs={1} className="g-3">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            serverUrl={serverUrl}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </Row>
    </Container>
  );
}

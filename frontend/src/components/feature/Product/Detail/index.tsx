import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import './style.css';

import { PureCarousel, StyledButton, UserRatingForm } from 'components/shared';
import { ProductProvider, CartConsumer } from 'context';
import { callAxios, axiosError } from 'helpers';
import { IErrorResponse } from 'types';
import ProductInfo from './ProductInfo';
import { IProduct, IProductResponse } from '../types';

export default function ProductDetailPage() {
  const { productId } = useParams() as {
    productId: string;
  };
  const [cart, cartDispatch] = CartConsumer();

  const [quantity, setQuantity] = React.useState<number>(1);

  const handleAddToCart = (product: IProduct) => {
    const lineItemExist = cart.lineItems.some(
      (lineItem) => lineItem.itemId === product.id
    );

    const actionType = lineItemExist ? 'UPDATE_LINE_ITEM' : 'ADD_LINE_ITEM';

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

  const fetchProduct = async () => {
    const res = await callAxios<IProductResponse>({
      axiosApi: `/products/${productId}`
    });
    const { product } = res as IProductResponse;

    return product;
  };

  // Queries
  const {
    data: product,
    isLoading,
    isError
  } = useQuery(['product', productId], fetchProduct, {
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    },
    refetchOnWindowFocus: false
  });

  const handleQuantity = (count: number) => {
    setQuantity((current) => {
      return current === 1 && count < 0 ? current : count + current;
    });
  };

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>An Error Occured!</span>;

  return (
    <>
      {!!product && (
        <ProductProvider productId={productId}>
          <div className="container">
            <div className="heading-section">
              <h2>{product.name}</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <PureCarousel images={product.images} />
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.category}</div>
                    <UserRatingForm
                      id={product.id}
                      star={product.averageRating}
                      numOfReviews={product.numOfReviews}
                      showNumOfReviews={true}
                    />
                    <div className="product-price-discount">
                      <span>${product.price}</span>
                      <span className="line-through"></span>
                    </div>
                  </div>
                  <p>{product.description}</p>
                  <div className="row">
                    {/* <div className="col-md-6">
                    <label htmlFor="size">Size</label>
                    <select id="size" name="size" className="form-control">
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div> */}
                    <div className="col-md-6">
                      <label htmlFor="color">Color</label>
                      <select id="color" name="color" className="form-control">
                        {product.colors.map((color, index) => (
                          <option key={index}>{color}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="product-count">
                    <label htmlFor="size">Quantity</label>
                    <form action="#" className="display-flex">
                      <div
                        className="qtyminus"
                        onClick={() => handleQuantity(-1)}>
                        -
                      </div>
                      <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        className="qty"
                        onChange={(e) => e.preventDefault()}
                        disabled
                      />
                      <div
                        className="qtyplus"
                        onClick={() => handleQuantity(+1)}>
                        +
                      </div>
                    </form>
                    <StyledButton
                      className="round-black-btn"
                      onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </StyledButton>
                  </div>
                </div>
              </div>
            </div>

            <ProductInfo product={product} />
          </div>
        </ProductProvider>
      )}
    </>
  );
}

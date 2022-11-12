import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { WishlistPopup } from 'components/features';
import { PureCarousel, UserRating } from 'components/shared';

import { AuthConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

import styles from 'assets/css/Product.module.css';

import { IProductResponse } from '../types';
import AddToCart from './AddToCart';
import ProductInfo from './ProductInfo';

export default function ProductDetailPage() {
  const { productId } = useParams() as {
    productId: string;
  };

  const { isAuth, user } = AuthConsumer();

  const fetchProduct = async () => {
    const res = await axiosCreate<IProductResponse>({
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

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>An Error Occured!</span>;

  return (
    <>
      {!!product && (
        <div className="container">
          <div className={styles['heading-section']}>
            <h2>{product.name}</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <PureCarousel images={product.images} />
            </div>
            <div className="col-md-6">
              <div className={styles['product-dtl']}>
                <div className={styles['product-info']}>
                  <div className={styles['product-name']}>
                    {product.category}
                  </div>
                  <UserRating rate={product.averageRating} />
                  <span>{product.numOfReviews} Reviews</span>
                  <div className={styles['product-price-discount']}>
                    <span>${product.price}</span>
                    <span className={styles['line-through']}></span>
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
                  {/* <div className="col-md-6">
                    <label htmlFor="color">Color</label>
                    <select id="color" name="color" className="form-control">
                      {product.colors.map((color, index) => (
                        <option key={index}>{color}</option>
                      ))}
                    </select>
                  </div> */}
                </div>
                <div className={styles['product-count']}>
                  <AddToCart product={product} />
                  {isAuth && user?.role === 'user' && (
                    <WishlistPopup productId={productId} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <ProductInfo product={product} />
        </div>
      )}
    </>
  );
}

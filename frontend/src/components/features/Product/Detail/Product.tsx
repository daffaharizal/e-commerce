import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { WishlistPopup } from 'components/features';
import { PureCarousel, Spinner, UserRating } from 'components/shared';

import ROLES from 'constant/roles';

import { AuthConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

import styles from 'assets/css/Product.module.css';

import { IProductResponse } from '../types';
import AddToCart from './AddToCart';
import ProductInfo from './ProductInfo';
import ProductSkus from './ProductSkus';

export default function ProductDetailPage() {
  const { productId, skuId } = useParams() as {
    productId: string;
    skuId: string;
  };

  const [varient, setVarient] = React.useState<
    { _id: string; name: string } | undefined
  >();

  const handleVarientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVarient({
      name: e.target.selectedOptions[0].text,
      _id: e.target.value
      // name: e.target[e.target.selectedIndex].text
    });
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

  const sku = product && product.skus.find((sku) => sku.id === skuId);

  React.useEffect(() => {
    if (product) {
      const skuItem = product.skus.find((sku) => sku.id === skuId);
      if (skuItem && skuItem.varients) {
        setVarient(skuItem.varients[0]);
      }
    }
  }, [product, sku]);

  if (isLoading) return <Spinner />;
  if (isError) return <span>An Error Occured!</span>;

  return (
    <>
      {sku && (
        <Container>
          <div className={styles['heading-section']}>
            <h2>
              {product.name} - {sku.name}
            </h2>
          </div>
          <Row key={skuId}>
            <Col md={6}>
              <PureCarousel images={sku.images} />
            </Col>
            <Col md={6}>
              <div className={styles['product-dtl']}>
                <div className={styles['product-info']}>
                  <div className={styles['product-name']}>
                    {product.category.name}
                  </div>
                  <UserRating rate={product.averageRating} />
                  <span>{product.numOfReviews} Reviews</span>
                  <div className={styles['product-price-discount']}>
                    <span>${sku.price}</span>
                    <span className={styles['line-through']}></span>
                  </div>
                </div>
                <p>{product.description}</p>
                <Row>
                  <Col md={6}>
                    <Form.Label htmlFor="size">Varients</Form.Label>
                    <Form.Select
                      id="size"
                      name="size"
                      onChange={handleVarientChange}>
                      {sku.varients.map(({ name, _id }) => (
                        <option key={_id} value={_id}>
                          {name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <div className={styles['product-count']}>
                  <AddToCart product={product} sku={sku} varient={varient} />
                  {isAuth && user?.role === ROLES.USER && (
                    <WishlistPopup productId={productId} skuId={skuId} />
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <ProductSkus product={product} />

          <ProductInfo product={product} />
        </Container>
      )}
    </>
  );
}

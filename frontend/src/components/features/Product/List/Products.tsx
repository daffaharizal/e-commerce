import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault
} from 'use-query-params';

import { Spinner, StyledPaginationButton } from 'components/shared';

import { CartConsumer, QueryConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

import { HandleAddToCartType, IProductsResponse } from '../types';
import ProductCard from './ProductCard';

export default function ProductListPage() {
  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  // Access the react query client
  const queryClient = QueryConsumer();

  const [{ search, page }, setUrlQuery] = useQueryParams({
    search: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 1)
  });

  const [cart, cartDispatch] = CartConsumer();

  const handleAddToCart = ({ product, sku, varient }: HandleAddToCartType) => {
    const lineItemExist = cart.lineItems.some(
      (lineItem) =>
        lineItem.productId === product.id &&
        lineItem.sku.skuId === sku.id &&
        lineItem.sku.varient?.varientId === varient?._id
    );

    const actionType = lineItemExist ? 'UPDATE_LINE_ITEM' : 'ADD_LINE_ITEM';
    const quantity = lineItemExist
      ? cart.lineItems
          .filter(
            (lineItem) =>
              lineItem.productId === product.id &&
              lineItem.sku.skuId === sku.id &&
              lineItem.sku.varient?.varientId === varient?._id
          )
          .reduce((accumulator, lineItem) => accumulator + lineItem.quantity, 1)
      : 1;

    cartDispatch({
      type: actionType,
      payload: {
        productId: product.id,
        productName: product.name,
        productCategory: product.category.name,
        quantity,
        sku: {
          skuId: sku.id,
          skuName: sku.name,
          ...(sku.images.length > 0 && { image: sku.images[0] }),
          ...(varient && {
            varient: { varientId: varient._id, varientName: varient.name }
          }),
          price: sku.price,
          discount: 0
        }
      }
    });
  };

  const fetchProducts = async ({ limit = 15, page = 1, search = '' }) => {
    if (!Number.isInteger(page) || page <= 0) {
      throw Error;
    }
    const res = await axiosCreate<IProductsResponse>({
      axiosApi: `/products?search=${search}&limit=${limit}&page=${page}`
    });
    return res;
  };

  // Queries
  const { data, isLoading, isError, isPreviousData } = useQuery(
    ['products', page, search],
    () => fetchProducts({ page, search }),
    {
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          axiosError(error as IErrorResponse);
        }
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 5000
    }
  );

  // Prefetch the next page!
  React.useEffect(() => {
    async () => {
      await queryClient.prefetchQuery(['projects', page, search], () =>
        fetchProducts({ page, search })
      );
    };
  }, [page, queryClient, search]);

  if (isLoading) return <Spinner />;
  if (isError) return <span>An Error Occured!</span>;

  return (
    <Container fluid="lg" className="mb-5">
      <TabContent id="myTabContent">
        <TabPane active aria-labelledby="products-tab">
          <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
            <span className="fw-bold text-uppercase">New Product</span>
            <StyledPaginationButton
              {...{
                isPreviousData,
                page,
                setUrlQuery,
                hasMore: data?.paging.hasMore,
                totalPages: data?.paging.totalPages
              }}
            />
          </div>
        </TabPane>
      </TabContent>

      <Row lg={3} md={2} sm={2} xs={1} className="g-3">
        {data?.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            sku={product.skus[0]}
            serverUrl={serverUrl}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </Row>
    </Container>
  );
}

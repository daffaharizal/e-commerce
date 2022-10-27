import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import { useQueryParams, NumberParam, withDefault } from 'use-query-params';
import { useQuery } from '@tanstack/react-query';

import { StyledButtonPagination } from 'components/shared';
import { CartConsumer, QueryConsumer } from 'context';
import { axiosCreate, axiosError } from 'helpers';
import { IErrorResponse } from 'types';
import ProductItem from './item';
import { IProduct, IProductsResponse } from '../types';

export default function ProductListPage() {
  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  // Access the client
  const queryClient = QueryConsumer();

  const [{ page }, setUrlQuery] = useQueryParams({
    page: withDefault(NumberParam, 1)
  });

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

  const fetchProducts = async ({ limit = 15, page = 1 }) => {
    if (!Number.isInteger(page) || page <= 0) {
      throw Error;
    }
    const res = await axiosCreate<IProductsResponse>({
      axiosApi: `/products?limit=${limit}&page=${page}`
    });
    return res;
  };

  // Queries
  const { data, isLoading, isError, isPreviousData } = useQuery(
    ['products', page],
    () => fetchProducts({ page }),
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
      await queryClient.prefetchQuery(['projects', page], () =>
        fetchProducts({ page })
      );
    };
  }, [page, queryClient]);

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>An Error Occured!</span>;

  return (
    <Container fluid="lg" className="mb-5">
      <TabContent id="myTabContent">
        <TabPane active aria-labelledby="products-tab">
          <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
            <span className="fw-bold text-uppercase">New Product</span>
            <StyledButtonPagination
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

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { StyledPaginationButton } from 'components/shared';

import { QueryConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

import { IProductResponse, ProductReviewsResponseTypes } from '../types';

const UserReviewCard = React.lazy(() => import('components/shared/ReviewCard'));

const ProductInfo: React.FC<IProductResponse> = ({ product }) => {
  // Access the react query client
  const queryClient = QueryConsumer();

  const [{ page }, setUrlQuery] = React.useState({
    page: 1
  });

  const fetchProductReviews = async ({ limit = 10, page = 1 }) => {
    if (!Number.isInteger(page) || page <= 0) {
      throw Error;
    }
    const res = await axiosCreate<ProductReviewsResponseTypes>({
      axiosApi: `/products/${product.id}/reviews/?limit=${limit}&page=${page}`
    });

    return res;
  };

  // Queries
  const { data, isPreviousData } = useQuery(
    ['reviews', product.id, page],
    () => fetchProductReviews({ page }),
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
      await queryClient.prefetchQuery(['reviews', product.id, page], () =>
        fetchProductReviews({ page })
      );
    };
  }, [page, queryClient]);

  return (
    <div className="product-info-tabs">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="description-tab"
            data-bs-toggle="tab"
            data-bs-target="#description"
            type="button"
            role="tab"
            aria-controls="description"
            aria-selected="true">
            Description
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="review-tab"
            data-bs-toggle="tab"
            data-bs-target="#review"
            type="button"
            role="tab"
            aria-controls="review"
            aria-selected="false">
            Reviews ({product.numOfReviews})
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
          aria-labelledby="description-tab">
          {product.description}
        </div>
        <div
          className="tab-pane fade"
          id="review"
          role="tabpanel"
          aria-labelledby="review-tab">
          <h3 className="fw-bold text-dark">Top Reviews</h3>
          <React.Suspense fallback={<div>loading</div>}>
            {data?.reviews.map((review, index) => (
              <UserReviewCard review={review} key={index} />
            ))}
          </React.Suspense>
          <StyledPaginationButton
            {...{
              isPreviousData,
              page,
              setUrlQuery,
              hasMore: data?.paging.hasMore,
              totalPages: data?.paging.totalPages
            }}
          />
          {(!data?.reviews || data?.reviews.length === 0) && (
            <p className="mb-4">There are no reviews yet.</p>
          )}
          {/* <UserReviewForm
            axiosApi="/reviews/"
            reviewItem={{ product: product.id }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

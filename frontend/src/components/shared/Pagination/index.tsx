import React from 'react';

import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

export function OffsetPagination({
  totalPages,
  currentPage,
  handleClick
}: {
  totalPages: number;
  currentPage: number;
  handleClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Pagination>
      {[...Array.from({ length: totalPages })]
        .map((_, index) => index + 1)
        .map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={handleClick}>
            {number}
          </Pagination.Item>
        ))}
    </Pagination>
  );
}

export function StyledPaginationButton({
  hasMore,
  isPreviousData,
  page,
  totalPages,
  setUrlQuery
}: {
  isPreviousData: boolean;
  page: number;
  hasMore: boolean | undefined;
  totalPages: number | undefined;
  setUrlQuery: React.Dispatch<React.SetStateAction<{ page: number }>>;
}) {
  return (
    <div className="fw-bold text-uppercase">
      Current Page: {page}
      <Button
        className="mx-3"
        variant="info"
        onClick={() =>
          setUrlQuery((current) => ({
            ...current,
            page: Math.max(current.page - 1, 1)
          }))
        }
        disabled={page <= 1 || (totalPages ? page > totalPages : true)}>
        Previous Page
      </Button>
      <Button
        variant="info"
        onClick={() =>
          setUrlQuery((current) => ({
            ...current,
            page: hasMore ? current.page + 1 : current.page
          }))
        }
        disabled={isPreviousData || !hasMore}>
        Next Page
      </Button>
    </div>
  );
}

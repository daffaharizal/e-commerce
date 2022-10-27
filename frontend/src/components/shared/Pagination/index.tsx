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

export function StyledButtonPagination({
  hasMore,
  isPreviousData,
  page,
  setPaging
}: {
  hasMore: boolean | undefined;
  isPreviousData: boolean;
  page: number;
  setPaging: React.Dispatch<
    React.SetStateAction<{ limit: number; page: number }>
  >;
}) {
  return (
    <div className="fw-bold text-uppercase">
      Current Page: {page}
      <Button
        className="mx-3"
        variant="info"
        onClick={() =>
          setPaging((old) => ({
            ...old,
            page: Math.max(old.page - 1, 1)
          }))
        }
        disabled={page === 1}>
        Previous Page
      </Button>
      <Button
        variant="info"
        onClick={() => {
          setPaging((old) => ({
            ...old,
            page: hasMore ? old.page + 1 : old.page
          }));
        }}
        disabled={isPreviousData || !hasMore}>
        Next Page
      </Button>
    </div>
  );
}

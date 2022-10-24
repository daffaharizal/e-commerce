import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export default function OffsetPagination({
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

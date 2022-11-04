import React from 'react';

import 'font-awesome/css/font-awesome.min.css';
import { Outlet, Route, Routes } from 'react-router-dom';

import { ProductDetailPage } from './Detail';
import { ProductListPage } from './List';

export default function ProductPage() {
  return (
    <div>
      <Routes>
        <Route index element={<ProductListPage />} />
        <Route path=":productId" element={<ProductDetailPage />} />
      </Routes>

      <Outlet />
    </div>
  );
}

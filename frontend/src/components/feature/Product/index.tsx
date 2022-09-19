import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';

import ProductListPage from './List';
import ProductDetailPage from './Detail';

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

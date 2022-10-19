import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from 'components/layout';
import {
  AuthPage,
  CartPage,
  NoMatch,
  ProductPage,
  ProfilePage,
  WishlistPage
} from 'components/feature';
import PrivateRoute from 'components/layout/PrivateRoute';
import ProtectedRoute from 'components/layout/ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate replace to="/products" />} />
        <Route path="products/*" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="auth"
          element={
            <ProtectedRoute>
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="wishlist"
          element={
            <PrivateRoute>
              <WishlistPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

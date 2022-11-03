import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from 'components/layouts/Admin';
import CommerceLayout from 'components/layouts/Commerce';
import {
  AuthPage,
  CartPage,
  NoMatch,
  ProductPage,
  ProfilePage,
  WishlistPage,
  AdminDash
} from 'components/features';
import PrivateRoute from 'components/layouts/PrivateRoute';
import ProtectedRoute from 'components/layouts/ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="admin/" element={<Navigate replace to="/admin/dash/" />} />
        <Route path="admin/dash/" element={<AdminDash />} />
      </Route>
      <Route element={<CommerceLayout />}>
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

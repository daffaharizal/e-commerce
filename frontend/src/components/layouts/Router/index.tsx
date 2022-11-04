import { Navigate, Route, Routes } from 'react-router-dom';

import {
  AdminDash,
  AuthPage,
  CartPage,
  NoMatch,
  ProductPage,
  ProfilePage,
  WishlistPage
} from 'components/features';
import AdminLayout from 'components/layouts/Admin';
import CommerceLayout from 'components/layouts/Commerce';

import AdminRoute from './AdminRoute';
import CommerceRoute from './CommerceRoute';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="admin/" element={<Navigate replace to="/admin/dash/" />} />
        <Route
          path="admin/dash/"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminDash />
              </AdminRoute>
            </PrivateRoute>
          }
        />
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
              <CommerceRoute>
                <ProfilePage />
              </CommerceRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="wishlist"
          element={
            <PrivateRoute>
              <CommerceRoute>
                <WishlistPage />
              </CommerceRoute>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

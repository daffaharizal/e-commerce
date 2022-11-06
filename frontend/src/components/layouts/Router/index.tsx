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

import * as ROUTES from 'constant/routes';

import AdminRoute from './AdminRoute';
import CommerceRoute from './CommerceRoute';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path={ROUTES.ADMIN}
          element={<Navigate replace to={ROUTES.ADMINDASH} />}
        />
        <Route
          path={ROUTES.ADMINDASH}
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
        <Route
          path={ROUTES.INDEX}
          element={<Navigate replace to={ROUTES.PRODUCTS} />}
        />
        <Route path={`${ROUTES.PRODUCTS}/*`} element={<ProductPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route
          path={ROUTES.AUTH}
          element={
            <ProtectedRoute>
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <PrivateRoute>
              <CommerceRoute>
                <ProfilePage />
              </CommerceRoute>
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.WISHLIST}
          element={
            <PrivateRoute>
              <CommerceRoute>
                <WishlistPage />
              </CommerceRoute>
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.NOMATCH} element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

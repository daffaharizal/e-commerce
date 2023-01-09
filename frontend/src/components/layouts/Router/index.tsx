import { Navigate, Route, Routes } from 'react-router-dom';

import {
  AddressPage,
  AdminDash,
  CartPage,
  ForgotPasswordPage,
  LoginPage,
  NoMatch,
  PasswordResetPage,
  ProductPage,
  ProfilePage,
  RegisterPage,
  UserVerificationPage,
  WishlistPage
} from 'components/features';
import AdminLayout from 'components/layouts/Admin';
import AnonymousLayout from 'components/layouts/Anonymous';
import CommerceLayout from 'components/layouts/Commerce';

import ROUTES from 'constant/routes';

import AdminRoute from './AdminRoute';
import CommerceRoute from './CommerceRoute';
import PreventedRoute from './PreventedRoute';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      {/* Anonymous Routers */}
      <Route element={<AnonymousLayout />}>
        <Route
          path={ROUTES.LOGIN}
          element={
            <PreventedRoute>
              <LoginPage />
            </PreventedRoute>
          }
        />
        <Route
          path={ROUTES.VERIFYUSER}
          element={
            <PreventedRoute>
              <UserVerificationPage />
            </PreventedRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <PreventedRoute>
              <RegisterPage />
            </PreventedRoute>
          }
        />
        <Route
          path={ROUTES.FORGOTPASSWORD}
          element={
            <PreventedRoute>
              <ForgotPasswordPage />
            </PreventedRoute>
          }
        />
        <Route
          path={ROUTES.PASSWORDRESET}
          element={
            <PreventedRoute>
              <PasswordResetPage />
            </PreventedRoute>
          }
        />
      </Route>

      {/* Admin Routers */}
      <Route element={<AdminLayout />}>
        <Route
          path={ROUTES.ADMIN}
          element={<Navigate replace to={ROUTES.ADMINDASH} />}
        />
        <Route
          path={ROUTES.ADMINDASH}
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDash />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Commerce Routers */}
      <Route element={<CommerceLayout />}>
        <Route
          path={ROUTES.INDEX}
          element={<Navigate replace to={ROUTES.PRODUCTS} />}
        />
        <Route path={`${ROUTES.PRODUCTS}/*`} element={<ProductPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <CommerceRoute>
                <ProfilePage />
              </CommerceRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADDRESSES}
          element={
            <ProtectedRoute>
              <CommerceRoute>
                <AddressPage />
              </CommerceRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.WISHLIST}
          element={
            <ProtectedRoute>
              <CommerceRoute>
                <WishlistPage />
              </CommerceRoute>
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.NOMATCH} element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

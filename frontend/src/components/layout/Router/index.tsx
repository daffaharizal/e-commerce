import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from 'components/layout';
import { AuthPage } from 'components/feature/Auth';
import ProductPage from 'components/feature/Product';
import NoMatch from 'components/feature/NoMatch';
import ProtectedRoute from 'components/layout/ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate replace to="/products" />} />
        <Route path="products/*" element={<ProductPage />} />
        <Route
          path="auth"
          element={
            <ProtectedRoute>
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

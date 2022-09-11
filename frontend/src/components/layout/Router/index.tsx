import { Routes, Route } from 'react-router-dom';

import Layout from 'components/layout';
import { AuthPage } from 'components/feature/Auth';
import ProductPage from 'components/feature/Product';
import NoMatch from 'components/feature/NoMatch';
import ProtectedRoute from 'components/shared/ProtectedRoute';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductPage />} />
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

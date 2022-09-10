import { Routes, Route } from 'react-router-dom';

import Layout from 'components/layout';
import ProductPage from 'components/feature/product';
import NoMatch from 'components/feature/nomatch';

import { AuthPage } from 'components/feature/auth';
import { AuthConsumer } from 'context/auth';

export default function Router() {
  const { isAuth } = AuthConsumer();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductPage />} />
        {!isAuth && <Route path="auth" element={<AuthPage />} />}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

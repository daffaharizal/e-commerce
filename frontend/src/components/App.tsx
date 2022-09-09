import React from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'assets/css/App.css';

import { AuthProvider } from 'context/auth';
import Layout from 'components/layout';
import ProductPage from './feature/product';
import NoMatch from 'components/feature/nomatch';
import { AuthPage } from 'components/feature/auth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<ProductPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

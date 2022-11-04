import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import Router from 'components/layouts/Router';

import { AuthProvider, CartProvider, QueryProvider } from 'context';

import 'assets/css/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <AuthProvider>
            <CartProvider>
              <QueryProvider>
                <Router />
              </QueryProvider>
            </CartProvider>
          </AuthProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

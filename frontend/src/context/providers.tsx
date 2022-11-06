import { PropsWithChildren } from 'react';

import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { AuthProvider, CartProvider, QueryProvider } from 'context';

const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthProvider>
        <CartProvider>
          <QueryProvider>{children}</QueryProvider>
        </CartProvider>
      </AuthProvider>
    </QueryParamProvider>
  );
};

export default ContextProvider;

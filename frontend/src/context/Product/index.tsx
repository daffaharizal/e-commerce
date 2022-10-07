import React from 'react';

import { IProductContext, IProductProps } from './types';

const ProductContext = React.createContext<IProductContext | undefined>(
  undefined
);

const ProductProvider: React.FC<IProductProps> = ({ productId, children }) => {
  return (
    <ProductContext.Provider value={{ productId }}>
      {children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = () =>
  React.useContext(ProductContext) as IProductContext;

export { ProductContext, ProductProvider, ProductConsumer };

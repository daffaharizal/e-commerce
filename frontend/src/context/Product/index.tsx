import React, { PropsWithChildren } from 'react';

import { IProductProps } from './types';

const ProductContext = React.createContext<IProductProps | undefined>(
  undefined
);

const ProductProvider: React.FC<PropsWithChildren & IProductProps> = ({
  productId,
  children
}) => {
  return (
    <ProductContext.Provider value={{ productId }}>
      {children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = () => React.useContext(ProductContext) as IProductProps;

export { ProductProvider, ProductConsumer };

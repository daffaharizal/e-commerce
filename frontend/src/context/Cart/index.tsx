import React, { PropsWithChildren } from 'react';

import { cartReducer, initialCart } from 'reducer/cart';

import { ICartContext } from './types';

const CartContext = React.createContext<ICartContext | undefined>(undefined);

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const CartReducer = React.useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={CartReducer}>{children}</CartContext.Provider>
  );
};

const CartConsumer = () => React.useContext(CartContext) as ICartContext;

export { CartProvider, CartConsumer };

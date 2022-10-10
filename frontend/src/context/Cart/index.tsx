import React from 'react';
import { cartReducer, initialCart } from 'reducer/cart';
import { IChildrenProps } from 'types';
import { ICartContext } from './types';

const CartContext = React.createContext<ICartContext | undefined>(undefined);

const CartProvider: React.FC<IChildrenProps> = ({ children }) => {
  const CartReducer = React.useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={CartReducer}>{children}</CartContext.Provider>
  );
};

const CartConsumer = () => React.useContext(CartContext) as ICartContext;

export { CartProvider, CartConsumer };

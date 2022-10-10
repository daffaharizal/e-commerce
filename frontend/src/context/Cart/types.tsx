import { ICart, ACTIONTYPE } from 'reducer/cart/types';

export type ICartContext = [ICart, React.Dispatch<ACTIONTYPE>];

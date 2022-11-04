import { ACTIONTYPE, ICart } from 'reducer/cart/types';

export type ICartContext = [ICart, React.Dispatch<ACTIONTYPE>];

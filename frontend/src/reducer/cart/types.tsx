import { IProduct } from 'components/feature/Product/types';

export interface ILineItem {
  itemId: string;
  item: IProduct;
  quantity: number;
  discount: number;
  price: number;
}

export interface ICart {
  currency: string;
  lineItems: ILineItem[];
  totalDiscount: number;
  totalPrice: number;
}

export type ACTIONTYPE = {
  type: 'ADD_LINE_ITEM' | 'UPDATE_LINE_ITEM' | 'REMOVE_LINE_ITEM';
  payload: ILineItem;
};

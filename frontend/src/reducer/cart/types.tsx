import { IProduct } from 'components/features/Product/types';

export interface ILineItemId {
  itemId: string;
}
export interface ILineItem extends ILineItemId {
  item: IProduct;
  quantity: number;
  discount: number;
  price: number;
}

export interface ICart {
  currency: string;
  lineItems: ILineItem[];
  subTotal: number;
  totalDiscount: number;
  netAmount: number;
}

export type ACTIONTYPE = {
  type: 'ADD_LINE_ITEM' | 'UPDATE_LINE_ITEM' | 'REMOVE_LINE_ITEM';
  payload: ILineItem | ILineItemId;
};

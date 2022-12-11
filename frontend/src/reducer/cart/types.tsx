import { SkuType } from 'components/features/Product/types';

export interface ILineItemId {
  productId: string;
  skuId: string;
}
export interface ILineItem extends ILineItemId {
  productName: string;
  productCategory: string;
  sku: SkuType;
  price: number;
  quantity: number;
  discount: number;
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

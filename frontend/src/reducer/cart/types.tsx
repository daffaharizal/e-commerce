import { IProductImages } from 'components/features/Product/types';

export interface ILineItemSku {
  skuId: string;
  skuName: string;
  image?: IProductImages;
  varient?: { varientId: string; varientName: string };
  price: number;
  discount: number;
}

export interface ILineItem {
  productId: string;
  productName: string;
  productCategory: string;
  quantity: number;
  sku: ILineItemSku;
}

export interface ICart {
  currency: string;
  lineItems: ILineItem[];
  subTotal: number;
  totalDiscount: number;
  netAmount: number;
}

export type RemoveLineItemType = {
  productId: string;
  skuId: string;
  varientId?: string;
};

export type ACTIONTYPE = {
  type: 'ADD_LINE_ITEM' | 'UPDATE_LINE_ITEM' | 'REMOVE_LINE_ITEM';
  payload: ILineItem | RemoveLineItemType;
};

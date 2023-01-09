import { ACTIONTYPE, ICart, ILineItem, RemoveLineItemType } from './types';

export const initialCart: ICart = {
  tax: 0,
  shippingFee: 0,
  billingAddressId: '',
  shippingAddressId: '',
  currency: 'dollar',
  lineItems: [],
  subTotal: 0,
  totalDiscount: 0,
  netAmount: 0
};

export function cartReducer(state: ICart, action: ACTIONTYPE) {
  const { type, payload } = action;
  const subTotal = (lineItems: ILineItem[]) =>
    lineItems.reduce(
      (accumulator, lineItems) =>
        accumulator + lineItems.sku.price * lineItems.quantity,
      0
    );
  const totalDiscount = (lineItems: ILineItem[]) =>
    lineItems.reduce(
      (accumulator, lineItems) => accumulator + lineItems.sku.discount,
      0
    );

  switch (type) {
    case 'ADD_LINE_ITEM': {
      const lineItems = [...state.lineItems, payload] as ILineItem[];

      return {
        ...state,
        lineItems,
        subTotal: subTotal(lineItems),
        totalDiscount: totalDiscount(lineItems),
        netAmount: subTotal(lineItems) - totalDiscount(lineItems)
      };
    }
    case 'UPDATE_LINE_ITEM': {
      const lineItems = state.lineItems.map((lineItem) => {
        const { productId, sku, quantity } = payload as ILineItem;
        if (
          lineItem.productId === productId &&
          lineItem.sku.skuId === sku.skuId &&
          lineItem.sku.varient?.varientId === sku.varient?.varientId
        ) {
          return {
            ...lineItem,
            quantity
          };
        }
        return lineItem;
      });
      return {
        ...state,
        lineItems,
        subTotal: subTotal(lineItems),
        totalDiscount: totalDiscount(lineItems),
        netAmount: subTotal(lineItems) - totalDiscount(lineItems)
      };
    }
    case 'REMOVE_LINE_ITEM': {
      const { skuId, varientId } = payload as RemoveLineItemType;
      const lineItems = state.lineItems.filter(
        (lineItem) =>
          (lineItem.sku.skuId === skuId &&
            lineItem.sku.varient?.varientId !== varientId) ||
          lineItem.sku.skuId !== skuId
      );
      return {
        ...state,
        lineItems,
        subTotal: subTotal(lineItems),
        totalDiscount: totalDiscount(lineItems),
        netAmount: subTotal(lineItems) - totalDiscount(lineItems)
      };
    }
    default: {
      return state;
    }
  }
}

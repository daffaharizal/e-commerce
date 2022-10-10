import { ICart, ILineItem, ACTIONTYPE } from './types';

export const initialCart: ICart = {
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
        accumulator + lineItems.price * lineItems.quantity,
      0
    );
  const totalDiscount = (lineItems: ILineItem[]) =>
    lineItems.reduce(
      (accumulator, lineItems) => accumulator + lineItems.discount,
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
        const { itemId, quantity } = payload as ILineItem;
        if (lineItem.itemId === itemId) {
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
      const lineItems = state.lineItems.filter(
        (lineItem) => lineItem.itemId !== payload.itemId
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

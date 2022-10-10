import { ICart, ILineItem, ACTIONTYPE } from './types';

export const initialCart: ICart = {
  lineItems: [],
  totalDiscount: 0,
  totalPrice: 0,
  currency: 'dollar'
};

export function cartReducer(state: ICart, action: ACTIONTYPE) {
  const { type, payload } = action;
  const totalDiscount = (lineItems: ILineItem[]) =>
    lineItems.reduce(
      (accumulator, lineItems) => accumulator + lineItems.discount,
      0
    );
  const totalPrice = (lineItems: ILineItem[]) =>
    lineItems.reduce(
      (accumulator, lineItems) =>
        accumulator + lineItems.price * lineItems.quantity,
      0
    );
  switch (type) {
    case 'ADD_LINE_ITEM': {
      const lineItems = [...state.lineItems, payload];

      return {
        ...state,
        lineItems,
        totalDiscount: totalDiscount(lineItems),
        totalPrice: totalPrice(lineItems)
      };
    }
    case 'UPDATE_LINE_ITEM': {
      const lineItems = state.lineItems.map((lineItem) => {
        if (lineItem.itemId === payload.itemId) {
          return {
            ...lineItem,
            quantity: payload.quantity
          };
        }
        return lineItem;
      });

      return {
        ...state,
        lineItems,
        totalDiscount: totalDiscount(lineItems),
        totalPrice: totalPrice(lineItems)
      };
    }
    case 'REMOVE_LINE_ITEM': {
      return state;
    }
    default: {
      return state;
    }
  }
}

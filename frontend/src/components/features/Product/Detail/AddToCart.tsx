import React from 'react';

import { StyledButton } from 'components/shared';

import { CartConsumer } from 'context';

import { IProduct } from '../types';

export default function AddToCart({ product }: { product: IProduct }) {
  const [cart, cartDispatch] = CartConsumer();
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleAddToCart = () => {
    const lineItemExist = cart.lineItems.some(
      (lineItem) => lineItem.itemId === product.id
    );

    const actionType = lineItemExist ? 'UPDATE_LINE_ITEM' : 'ADD_LINE_ITEM';

    cartDispatch({
      type: actionType,
      payload: {
        itemId: product.id,
        item: product,
        quantity,
        discount: 0,
        price: product.price
      }
    });
  };
  const handleQuantity = (count: number) => {
    setQuantity((current) => {
      return current === 1 && count < 0 ? current : count + current;
    });
  };
  return (
    <>
      <label htmlFor="size">Quantity</label>
      <form action="#" className="display-flex">
        <div className="qtyminus" onClick={() => handleQuantity(-1)}>
          -
        </div>
        <input
          type="text"
          name="quantity"
          value={quantity}
          className="qty"
          onChange={(e) => e.preventDefault()}
          disabled
        />
        <div className="qtyplus" onClick={() => handleQuantity(+1)}>
          +
        </div>
      </form>
      <StyledButton
        className="btn btn-dark my-3 px-5"
        onClick={() => handleAddToCart()}>
        Add to Cart
      </StyledButton>
    </>
  );
}

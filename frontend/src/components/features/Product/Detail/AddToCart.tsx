import React from 'react';

import { Form } from 'react-bootstrap';

import { StyledButton } from 'components/shared';

import { CartConsumer } from 'context';

import styles from 'assets/css/Product.module.css';

import { IProduct, SkuType } from '../types';

export default function AddToCart({
  product,
  sku,
  varient
}: {
  product: IProduct;
  sku: SkuType;
  varient: { _id: string; name: string } | undefined;
}) {
  const [cart, cartDispatch] = CartConsumer();
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleAddToCart = () => {
    const lineItemExist = cart.lineItems.some(
      (lineItem) =>
        lineItem.sku.skuId === sku.id &&
        lineItem.productId === product.id &&
        lineItem.sku.skuId === sku.id &&
        lineItem.sku.varient?.varientId === varient?._id
    );

    const actionType = lineItemExist ? 'UPDATE_LINE_ITEM' : 'ADD_LINE_ITEM';

    cartDispatch({
      type: actionType,
      payload: {
        productId: product.id,
        productName: product.name,
        productCategory: product.category.name,
        quantity,
        sku: {
          skuId: sku.id,
          skuName: sku.name,
          ...(sku.images.length > 0 && { image: sku.images[0] }),
          ...(varient && {
            varient: { varientId: varient._id, varientName: varient.name }
          }),
          price: sku.price,
          discount: 0
        }
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
      <Form.Label htmlFor="size">Quantity</Form.Label>
      <Form className="d-flex">
        <div className={styles['qtyminus']} onClick={() => handleQuantity(-1)}>
          -
        </div>
        <Form.Control
          type="text"
          name="quantity"
          value={quantity}
          className={styles['qty']}
          onChange={(e) => e.preventDefault()}
          disabled
        />
        <div className={styles['qtyplus']} onClick={() => handleQuantity(+1)}>
          +
        </div>
      </Form>
      <StyledButton
        className="btn btn-dark my-3 px-5"
        onClick={() => handleAddToCart()}>
        Add to Cart
      </StyledButton>
    </>
  );
}

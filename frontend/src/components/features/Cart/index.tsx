import React from 'react';
import { FaPlus, FaMinus, FaTimes, FaLongArrowAltLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import './styles.css';
import { CartConsumer } from 'context';
import NoImage from 'assets/images/noproductimage.png';
import { IProduct } from 'components/features/Product/types';

export default function CartPage() {
  const [{ lineItems, subTotal, netAmount }, cartDispatch] = CartConsumer();

  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  const removeItem = (itemId: string) => {
    cartDispatch({
      type: 'REMOVE_LINE_ITEM',
      payload: {
        itemId
      }
    });
  };

  const updateItemQty = ({
    count,
    item,
    quantity
  }: {
    count: number;
    item: IProduct;
    quantity: number;
  }) => {
    if (count < 0 && quantity === 1) {
      return;
    }

    cartDispatch({
      type: 'UPDATE_LINE_ITEM',
      payload: {
        itemId: item.id,
        item,
        quantity: count < 0 ? quantity - 1 : quantity + 1,
        discount: 0,
        price: item.price
      }
    });
  };

  return (
    <section className="h-100 h-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {lineItems.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />
                      {lineItems.length > 0 &&
                        lineItems.map(({ itemId, item, quantity, price }) => (
                          <React.Fragment key={itemId}>
                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <NavLink to={`/products/${itemId}`}>
                                  {item.images.length > 0 ? (
                                    <img
                                      src={
                                        item.images[0].isPublicUrl
                                          ? item.images[0].url
                                          : `http://${serverUrl}${item.images[0].url}`
                                      }
                                      className="img-fluid rounded-3 text-black text-decoration-none"
                                      alt={item.images[0].name}
                                    />
                                  ) : (
                                    <img
                                      src={NoImage}
                                      className="img-fluid rounded-3 text-black text-decoration-none"
                                      alt="noimage"
                                    />
                                  )}
                                </NavLink>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted text-capitalize">
                                  {item.category}
                                </h6>
                                <h6 className="text-black mb-0 text-capitalize">
                                  <NavLink
                                    to={`/products/${itemId}`}
                                    className="text-black text-decoration-none">
                                    {item.name}
                                  </NavLink>
                                </h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() =>
                                    updateItemQty({
                                      count: -1,
                                      item,
                                      quantity
                                    })
                                  }>
                                  <FaMinus size={13} />
                                </button>

                                <input
                                  type="text"
                                  name="quantity"
                                  className="form-control form-control-sm qty"
                                  value={quantity}
                                  onChange={(e) => e.preventDefault()}
                                  disabled
                                />

                                <button
                                  className="btn btn-link px-2"
                                  onClick={() =>
                                    updateItemQty({
                                      count: +1,
                                      item,
                                      quantity
                                    })
                                  }>
                                  <FaPlus size={13} />
                                </button>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">€ {price}</h6>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a
                                  className="text-muted"
                                  onClick={() => removeItem(itemId)}>
                                  <FaTimes size={13} />
                                </a>
                              </div>
                            </div>
                            <hr className="my-4" />
                          </React.Fragment>
                        ))}

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <NavLink to="/products" className="text-body">
                            <FaLongArrowAltLeft className="me-2" size={18} />
                            Back to shop
                          </NavLink>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">
                          {lineItems.length} items
                        </h5>
                        <h5>$ {subTotal}</h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Shipping</h5>

                      <div className="mb-4 pb-2">
                        <select className="select form-control">
                          <option value="1">Standard Delivery ($ 0.00)</option>
                          <option value="1">Premium Delivery ($ 5.00)</option>
                        </select>
                      </div>

                      <h5 className="text-uppercase mb-3">Give code</h5>

                      <div className="mb-5">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Examplea2"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Examplea2">
                            Enter your code
                          </label>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>$ {netAmount}</h5>
                      </div>

                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark">
                        Proceed to Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

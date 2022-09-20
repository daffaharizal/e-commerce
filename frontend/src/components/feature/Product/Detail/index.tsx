import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import PureCarousel from 'components/shared/Carousel';
import './style.css';

import { StyledButton } from 'components/shared';
import { iProduct, iProductDetailResponse } from '../types';

export default function ProductDetailPage() {
  const { productId } = useParams() as {
    productId: string;
  };

  const [product, setProduct] = React.useState<iProduct>();
  const [quantity, setQuantity] = React.useState<number>(1);

  const serverURL: string = process.env.REACT_APP_API_ENDPOINT || '';

  React.useEffect(() => {
    const fetchProduct = async () => {
      const res: iProductDetailResponse = await axios.get(
        `http://${serverURL}/api/v1/products/${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      const {
        data: { product }
      } = res;
      setProduct(product);
    };

    !product && fetchProduct();
  }, []);

  const handleQuantity = (count: number) => {
    setQuantity((current) => {
      return current === 1 && count < 0 ? current : count + current;
    });
  };

  return (
    <>
      {!!product && (
        <div className="container">
          <div className="heading-section">
            <h2>{product.name}</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <PureCarousel element={product} />
            </div>
            <div className="col-md-6">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="product-name">{product.category}</div>
                  <div className="reviews-counter">
                    <div className="rate">
                      <input type="radio" id="star5" name="rate" />
                      <label htmlFor="star5" title="text">
                        5 stars
                      </label>
                      <input type="radio" id="star4" name="rate" />
                      <label htmlFor="star4" title="text">
                        4 stars
                      </label>
                      <input type="radio" id="star3" name="rate" />
                      <label htmlFor="star3" title="text">
                        3 stars
                      </label>
                      <input type="radio" id="star2" name="rate" />
                      <label htmlFor="star2" title="text">
                        2 stars
                      </label>
                      <input type="radio" id="star1" name="rate" />
                      <label htmlFor="star1" title="text">
                        1 star
                      </label>
                    </div>
                    <span>3 Reviews</span>
                  </div>
                  <div className="product-price-discount">
                    <span>${product.price}</span>
                    <span className="line-through"></span>
                  </div>
                </div>
                <p>{product.description}</p>
                <div className="row">
                  {/* <div className="col-md-6">
                    <label htmlFor="size">Size</label>
                    <select id="size" name="size" className="form-control">
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div> */}
                  <div className="col-md-6">
                    <label htmlFor="color">Color</label>
                    <select id="color" name="color" className="form-control">
                      {product.colors.map((color, index) => (
                        <option key={index}>{color}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="product-count">
                  <label htmlFor="size">Quantity</label>
                  <form action="#" className="display-flex">
                    <div
                      className="qtyminus"
                      onClick={() => handleQuantity(-1)}>
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
                  <StyledButton className="round-black-btn">
                    Add to Cart
                  </StyledButton>
                </div>
              </div>
            </div>
          </div>
          {/* New Nav tab */}
          <div className="product-info-tabs">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="description-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#description"
                  type="button"
                  role="tab"
                  aria-controls="description"
                  aria-selected="true">
                  Description
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#review"
                  type="button"
                  role="tab"
                  aria-controls="review"
                  aria-selected="false">
                  Reviews (0)
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="description"
                role="tabpanel"
                aria-labelledby="description-tab">
                {product.description}
              </div>
              <div
                className="tab-pane fade"
                id="review"
                role="tabpanel"
                aria-labelledby="review-tab">
                <h3 className="fw-bold text-dark">REVIEWS</h3>
                <p className="mb-4">There are no reviews yet.</p>
                <form className="review-form">
                  <div className="form-group mb-5">
                    <label>Your rating</label>
                    <div className="reviews-counter">
                      <div className="rate">
                        <input type="radio" id="star5" name="rate" />
                        <label htmlFor="star5" title="text">
                          5 stars
                        </label>
                        <input type="radio" id="star4" name="rate" />
                        <label htmlFor="star4" title="text">
                          4 stars
                        </label>
                        <input type="radio" id="star3" name="rate" />
                        <label htmlFor="star3" title="text">
                          3 stars
                        </label>
                        <input type="radio" id="star2" name="rate" />
                        <label htmlFor="star2" title="text">
                          2 stars
                        </label>
                        <input type="radio" id="star1" name="rate" />
                        <label htmlFor="star1" title="text">
                          1 star
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label>Your message</label>
                    <textarea className="form-control" rows={10}></textarea>
                  </div>
                  <button className="round-black-btn">Submit Review</button>
                </form>
              </div>
            </div>
          </div>
          {/* End New NavTab */}
        </div>
      )}
    </>
  );
}

import 'assets/css/Product.module.css';

export default function ProductPage() {
  return (
    <div>
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed">
          <div className="container-fluid d-flex">
            <a className="navbar-brand" href="#">
              Ecommerce
            </a>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true">
                  Couches
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false">
                  Chair
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false">
                  Dining
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-fluid mt-2 mb-5">
        <div className="products">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab">
              <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
                <span className="font-weight-bold text-uppercase">
                  Luxury Couch
                </span>
                <div>
                  <img
                    src="https://img.icons8.com/windows/100/000000/list.png"
                    width="30"
                  />
                  <img
                    src="https://img.icons8.com/ios-filled/100/000000/squared-menu.png"
                    width="25"
                  />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/SOMPPzU.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Wood Sofa set-3
                        </span>
                        <span className="font-weight-bold">$550</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">2 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/FhRHNGE.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Wood Sofa set-3
                        </span>
                        <span className="font-weight-bold">$600</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">1 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/eu74Mje.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Wood Sofa set-23
                        </span>
                        <span className="font-weight-bold">$1,000</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">4 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab">
              <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
                <span className="font-weight-bold text-uppercase">
                  Luxury Chairs
                </span>
                <div>
                  <img
                    src="https://img.icons8.com/windows/100/000000/list.png"
                    width="30"
                  />
                  <img
                    src="https://img.icons8.com/ios-filled/100/000000/squared-menu.png"
                    width="25"
                  />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/2ldaKjy.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Wodden chairs set-2
                        </span>
                        <span className="font-weight-bold">$150</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">4 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/lTgyE2X.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Wodden Chairs Premium set-2
                        </span>
                        <span className="font-weight-bold">$200</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">2 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/NFcMfYE.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Office Chairs set-2
                        </span>
                        <span className="font-weight-bold">$500</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">7 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab">
              <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center">
                <span className="font-weight-bold text-uppercase">
                  Luxury Dining
                </span>
                <div>
                  <img
                    src="https://img.icons8.com/windows/100/000000/list.png"
                    width="30"
                  />
                  <img
                    src="https://img.icons8.com/ios-filled/100/000000/squared-menu.png"
                    width="25"
                  />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/hnQ492C.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Dinning table set-4
                        </span>
                        <span className="font-weight-bold">$450</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">4 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/10JlX4K.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Dinning set set-8
                        </span>
                        <span className="font-weight-bold">$2,000</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">6 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <img
                      src="https://i.imgur.com/eu74Mje.jpg"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="font-weight-bold">
                          Dinning chairs set-3
                        </span>
                        <span className="font-weight-bold">$900</span>
                      </div>
                      <p className="card-text mb-1 mt-1">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex align-items-center flex-row">
                        <img src="https://i.imgur.com/e9VnSng.png" width="20" />
                        <span className="guarantee">4 Years Guarantee</span>
                      </div>
                    </div>
                    <hr />
                    <div className="card-body">
                      <div className="text-right buttons">
                        <button className="btn btn-outline-dark">
                          add to wishlist
                        </button>
                        <button className="btn btn-dark">Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

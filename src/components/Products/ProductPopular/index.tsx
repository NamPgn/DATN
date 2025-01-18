import { Link } from "react-router-dom";

const ProductPopular = () => {
  return (
    <section className="popularProductsSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="secTitle">Popular Products</h2>
            <p className="secDesc">Showing our latest arrival on this summer</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="productTabs">
              <ul
                className="nav productTabsNav absolutes"
                id="productTab"
                role="tablist"
              >
                <li role="presentation">
                  <button
                    className="active"
                    id="men-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#men-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="men-tab-pane"
                    aria-selected="true"
                  >
                    Men
                  </button>
                </li>
                <li role="presentation">
                  <button
                    id="women-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#women-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="women-tab-pane"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Women
                  </button>
                </li>
                <li role="presentation">
                  <button
                    id="kids-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#kids-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="kids-tab-pane"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Kids
                  </button>
                </li>
                <li role="presentation">
                  <button
                    id="accessories-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#accessories-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="accessories-tab-pane"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Accessories
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="productTabContent">
                <div
                  className="tab-pane fade show active"
                  id="men-tab-pane"
                  role="tabpanel"
                  aria-labelledby="men-tab"
                  tabIndex={0}
                >
                  <div className="row">
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                      <div className="productItem01">
                        <div className="pi01Thumb">
                          <img
                            src="/assets/images/products/5.jpg"
                            alt="Ulina Product"
                          />
                          <img
                            src="/assets/images/products/5.1.jpg"
                            alt="Ulina Product"
                          />
                          <div className="pi01Actions">
                            <a href="javascript:void(0);" className="pi01Cart">
                              <i className="fa-solid fa-shopping-cart" />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="pi01QuickView"
                            >
                              <i className="fa-solid fa-arrows-up-down-left-right" />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="pi01Wishlist"
                            >
                              <i className="fa-solid fa-heart" />
                            </a>
                          </div>
                          <div className="productLabels clearfix">
                            <span className="plDis">- $29</span>
                            <span className="plSale">Sale</span>
                          </div>
                        </div>
                        <div className="pi01Details">
                          <div className="productRatings">
                            <div className="productRatingWrap">
                              <div className="star-rating">
                                <span />
                              </div>
                            </div>
                            <div className="ratingCounts">10 Reviews</div>
                          </div>
                          <h3>
                            <Link to="/product/detail">
                              Stylish white leather bag
                            </Link>
                          </h3>
                          <div className="pi01Price">
                            <ins>$29</ins>
                            <del>$56</del>
                          </div>
                          <div className="pi01Variations">
                            <div className="pi01VColor">
                              <div className="pi01VCItem">
                                <input
                                  type="radio"
                                  name="color_1_1"
                                  defaultValue="Blue"
                                  id="color_1_1_1_blue"
                                />
                                <label htmlFor="color_1_1_1_blue" />
                              </div>
                              <div className="pi01VCItem yellows">
                                <input
                                  type="radio"
                                  name="color_1_1"
                                  defaultValue="Yellow"
                                  id="color_1_1_2_blue"
                                />
                                <label htmlFor="color_1_1_2_blue" />
                              </div>
                              <div className="pi01VCItem reds">
                                <input
                                  type="radio"
                                  name="color_1_1"
                                  defaultValue="Red"
                                  id="color_1_1_3_blue"
                                />
                                <label htmlFor="color_1_1_3_blue" />
                              </div>
                            </div>
                            <div className="pi01VSize">
                              <div className="pi01VSItem">
                                <input
                                  type="radio"
                                  name="size_1_1"
                                  defaultValue="Blue"
                                  id="size1_1_1_1"
                                />
                                <label htmlFor="size1_1_1_1">S</label>
                              </div>
                              <div className="pi01VSItem">
                                <input
                                  type="radio"
                                  name="size_1_1"
                                  defaultValue="Yellow"
                                  id="size1_1_1_2"
                                />
                                <label htmlFor="size1_1_1_2">M</label>
                              </div>
                              <div className="pi01VSItem">
                                <input
                                  type="radio"
                                  name="size_1_1"
                                  defaultValue="Red"
                                  id="size1_1_1_3"
                                />
                                <label htmlFor="size1_1_1_3">XL</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="women-tab-pane"
                  role="tabpanel"
                  aria-labelledby="women-tab"
                  tabIndex={0}
                >
                  <div className="row">
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                      <div className="productItem01 pi01NoRating">
                        <div className="pi01Thumb">
                          <img
                            src="/assets/images/products/9.jpg"
                            alt="Ulina Product"
                          />
                          <img
                            src="/assets/images/products/9.1.jpg"
                            alt="Ulina Product"
                          />
                          <div className="pi01Actions">
                            <a href="javascript:void(0);" className="pi01Cart">
                              <i className="fa-solid fa-shopping-cart" />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="pi01QuickView"
                            >
                              <i className="fa-solid fa-arrows-up-down-left-right" />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="pi01Wishlist"
                            >
                              <i className="fa-solid fa-heart" />
                            </a>
                          </div>
                          <div className="productLabels clearfix">
                            <span className="plHot float-end">Hot</span>
                          </div>
                        </div>
                        <div className="pi01Details">
                          <h3>
                            <a href="shop_details1.html">
                              Mini sleeve gray t-shirt
                            </a>
                          </h3>
                          <div className="pi01Price">
                            <ins>$39</ins>
                            <del>$60</del>
                          </div>
                          <div className="pi01Variations">
                            <div className="pi01VColor">
                              <div className="pi01VCItem">
                                <input
                                  type="radio"
                                  name="color_2_5"
                                  defaultValue="Blue"
                                  id="color_2_5_1_blue"
                                />
                                <label htmlFor="color_2_5_1_blue" />
                              </div>
                              <div className="pi01VCItem yellows">
                                <input
                                  type="radio"
                                  name="color_2_5"
                                  defaultValue="Yellow"
                                  id="color_2_5_2_blue"
                                />
                                <label htmlFor="color_2_5_2_blue" />
                              </div>
                              <div className="pi01VCItem reds">
                                <input
                                  type="radio"
                                  name="color_2_5"
                                  defaultValue="Red"
                                  id="color_2_5_3_blue"
                                />
                                <label htmlFor="color_2_5_3_blue" />
                              </div>
                            </div>
                            <div className="pi01VSize">
                              <div className="pi01VSItem">
                                <input
                                  type="radio"
                                  name="size_2_5"
                                  defaultValue="Blue"
                                  id="size1_2_5_1"
                                />
                                <label htmlFor="size1_2_5_1">S</label>
                              </div>
                              <div className="pi01VSItem">
                                <input
                                  type="radio"
                                  name="size_2_5"
                                  defaultValue="Yellow"
                                  id="size1_2_5_2"
                                />
                                <label htmlFor="size1_2_5_2">M</label>
                              </div>
                              <div className="pi01VSItem">
                                <input
                                  type="radio"
                                  name="size_2_5"
                                  defaultValue="Red"
                                  id="size1_2_5_3"
                                />
                                <label htmlFor="size1_2_5_3">XL</label>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPopular;

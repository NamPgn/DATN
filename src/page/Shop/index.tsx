const Shop = () => {
  return (
    <>
      <section className="shopPageSection shopPageHasSidebar">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3">
              <div className="shopSidebar">
                <aside className="widget">
                  <h3 className="widgetTitle">Item Categories</h3>
                  <ul>
                    <li className="menu-item-has-children">
                      <a href="javascript:void(0);">Accessories</a>
                      <ul>
                        <li>
                          <a href="shop_full_width.html">Bag</a>
                        </li>
                        <li>
                          <a href="shop_left_sidebar.html">wallet</a>
                        </li>
                        <li>
                          <a href="shop_right_sidebar.html">Hat</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="javascript:void(0);">Fashions</a>
                      <ul>
                        <li>
                          <a href="shop_full_width.html">Men</a>
                        </li>
                        <li>
                          <a href="shop_left_sidebar.html">Women</a>
                        </li>
                        <li>
                          <a href="shop_right_sidebar.html">Kids</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Electronics</a>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="javascript:void(0);">Furniture</a>
                      <ul>
                        <li>
                          <a href="shop_full_width.html">Living</a>
                        </li>
                        <li>
                          <a href="shop_left_sidebar.html">Kitchen</a>
                        </li>
                        <li>
                          <a href="shop_right_sidebar.html">Office</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Shoes</a>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="javascript:void(0);">Jewellary</a>
                      <ul>
                        <li>
                          <a href="shop_full_width.html">Gold</a>
                        </li>
                        <li>
                          <a href="shop_left_sidebar.html">Diamond</a>
                        </li>
                        <li>
                          <a href="shop_right_sidebar.html">Imitation</a>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="javascript:void(0);">Others</a>
                      <ul>
                        <li>
                          <a href="shop_full_width.html">Electronics</a>
                        </li>
                        <li>
                          <a href="shop_left_sidebar.html">Phone</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </aside>

                <aside className="widget priceFilter">
                  <h3 className="widgetTitle">Price Range</h3>
                  <div className="shopWidgetWraper">
                    <div className="priceFilterSlider">
                      <form action="#" method="get" className="clearfix">
                        <div
                          id="sliderRange"
                          className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                        >
                          <div
                            className="ui-slider-range ui-corner-all ui-widget-header"
                            style={{ left: "0%", width: "20%" }}
                          />
                          <span
                            tabIndex={0}
                            className="ui-slider-handle ui-corner-all ui-state-default"
                            style={{ left: "0%" }}
                          />
                          <span
                            tabIndex={0}
                            className="ui-slider-handle ui-corner-all ui-state-default"
                            style={{ left: "20%" }}
                          />
                        </div>
                        <div className="pfsWrap">
                          <label>Price</label>
                          <span id="amount">$0 - $2000</span>
                        </div>
                      </form>
                    </div>
                  </div>
                </aside>
                <aside className="widget sizeFilter">
                  <h3 className="widgetTitle">Size</h3>
                  <div className="productSizeWrap">
                    <div className="pswItem">
                      <input
                        type="radio"
                        name="ws_1"
                        defaultValue="S"
                        id="ws_1sdfsdf_s"
                      />
                      <label htmlFor="ws_1sdfsdf_s">S</label>
                    </div>
                    <div className="pswItem">
                      <input
                        type="radio"
                        name="ws_1"
                        defaultValue="M"
                        id="ws_1tst_m"
                      />
                      <label htmlFor="ws_1tst_m">M</label>
                    </div>
                    <div className="pswItem">
                      <input
                        type="radio"
                        name="ws_1"
                        defaultValue="L"
                        id="ws_1234_l"
                      />
                      <label htmlFor="ws_1234_l">L</label>
                    </div>
                    <div className="pswItem">
                      <input
                        type="radio"
                        name="ws_1"
                        defaultValue="XL"
                        id="ws_1_xl"
                      />
                      <label htmlFor="ws_1_xl">XL</label>
                    </div>
                  </div>
                </aside>
                <aside className="widget colorFilter">
                  <h3 className="widgetTitle">Color</h3>
                  <div className="productColorWrap">
                    <div className="pcwItem">
                      <input
                        type="radio"
                        name="wc_1"
                        defaultValue="S"
                        id="wc_1_1"
                      />
                      <label htmlFor="wc_1_1" />
                    </div>
                    <div className="pcwItem pcwi2">
                      <input
                        type="radio"
                        name="wc_1"
                        defaultValue="M"
                        id="wc_1_2"
                      />
                      <label htmlFor="wc_1_2" />
                    </div>
                    <div className="pcwItem pcwi3">
                      <input
                        type="radio"
                        name="wc_1"
                        defaultValue="L"
                        id="wc_1_3"
                      />
                      <label htmlFor="wc_1_3" />
                    </div>
                    <div className="pcwItem pcwi4">
                      <input
                        type="radio"
                        name="wc_1"
                        defaultValue="XL"
                        id="wc_1_4"
                      />
                      <label htmlFor="wc_1_4" />
                    </div>
                    <div className="pcwItem pcwi5">
                      <input
                        type="radio"
                        name="wc_1"
                        defaultValue="XL"
                        id="wc_1_5"
                      />
                      <label htmlFor="wc_1_5" />
                    </div>
                  </div>
                </aside>
                <aside className="widget">
                  <h3 className="widgetTitle">Brand Name</h3>
                  <ul>
                    <li>
                      <a href="javascript:void(0);">Sony</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Lenovo</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Jonson &amp; Handson</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Apple</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Google</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Hp</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Uniliver</a>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="row shopAccessRow">
                <div className="col-sm-6">
                  <div className="productCount">
                    Showing <strong>1 - 16</strong> of <strong>220</strong>{" "}
                    items
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="shopAccessBar">
                    <div className="sortNav">
                      <form method="post" action="#">
                        <label>Sort By</label>
                        <select
                          name="productFilter"
                          style={{ display: "none" }}
                        >
                          <option value="">Default</option>
                          <option value={1}>High to low</option>
                          <option value={2}>Low to high</option>
                          <option value={3}>Top rated</option>
                          <option value={4}>Recently viewed</option>
                        </select>
                        <div className="nice-select" tabIndex={0}>
                          <span className="current">Default</span>
                          <ul className="list">
                            <li data-value="" className="option selected">
                              Default
                            </li>
                            <li data-value={1} className="option">
                              High to low
                            </li>
                            <li data-value={2} className="option">
                              Low to high
                            </li>
                            <li data-value={3} className="option">
                              Top rated
                            </li>
                            <li data-value={4} className="option">
                              Recently viewed
                            </li>
                          </ul>
                        </div>
                      </form>
                    </div>
                    <ul
                      className="nav productViewTabnav"
                      id="productViewTab"
                      role="tablist"
                    >
                      <li role="presentation">
                        <button
                          id="list-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#list-tab-pane"
                          type="button"
                          role="tab"
                          data-aria-controls="list-tab-pane"
                          data-aria-selected="false"
                          aria-selected="false"
                          tabIndex={-1}
                        >
                          <i className="fa-solid fa-list" />
                        </button>
                      </li>
                      <li role="presentation">
                        <button
                          className="active"
                          id="grid-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#grid-tab-pane"
                          type="button"
                          role="tab"
                          data-aria-controls="grid-tab-pane"
                          data-aria-selected="true"
                          aria-selected="true"
                        >
                          <i className="fa-solid fa-table-cells" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row shopProductRow">
                <div className="col-lg-12">
                  <div
                    className="tab-content productViewTabContent"
                    id="productViewTabContent"
                  >
                    <div
                      className="tab-pane show active"
                      id="grid-tab-pane"
                      role="tabpanel"
                      aria-labelledby="grid-tab"
                      tabIndex={0}
                    >
                      <div className="row">
                        <div className="col-sm-6 col-xl-4">
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
                                <a
                                  href="javascript:void(0);"
                                  className="pi01Cart"
                                >
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
                                <a href="shop_details1.html">
                                  Stylish white leather bag
                                </a>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;

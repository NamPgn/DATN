import React from "react";

const ProductSale = () => {
  return (
    <section className="latestArrivalSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="secTitle">Latest Arrival</h2>
            <p className="secDesc">Showing our latest arrival on this summer</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="productCarousel owl-carousel owl-loaded owl-drag">
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(0px, 0px, 0px)",
                    transition: "0.25s",
                    width: 1980,
                  }}
                >
                  <div
                    className="owl-item active"
                    style={{ width: 306, marginRight: 24 }}
                  >
                    <div className="productItem01">
                      <div className="pi01Thumb">
                        <img src="/assets/images/products/1.jpg" alt="Ulina Product" />
                        <img
                          src="/assets/images/products/1.1.jpg"
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
                          <span className="plDis">- $49</span>
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
                            Men’s blue cotton t-shirt
                          </a>
                        </h3>
                        <div className="pi01Price">
                          <ins>$49</ins>
                          <del>$60</del>
                        </div>
                        <div className="pi01Variations">
                          <div className="pi01VColor">
                            <div className="pi01VCItem">
                              <input
                                defaultChecked={false}
                                type="radio"
                                name="color1"
                                defaultValue="Blue"
                                id="color1_blue"
                              />
                              <label htmlFor="color1_blue" />
                            </div>
                            <div className="pi01VCItem yellows">
                              <input
                                type="radio"
                                name="color1"
                                defaultValue="Yellow"
                                id="color1_yellow"
                              />
                              <label htmlFor="color1_yellow" />
                            </div>
                            <div className="pi01VCItem reds">
                              <input
                                type="radio"
                                name="color1"
                                defaultValue="Red"
                                id="color1_red"
                              />
                              <label htmlFor="color1_red" />
                            </div>
                          </div>
                          <div className="pi01VSize">
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size1"
                                defaultValue="Blue"
                                id="size1_s"
                              />
                              <label htmlFor="size1_s">S</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size1"
                                defaultValue="Yellow"
                                id="size1_m"
                              />
                              <label htmlFor="size1_m">M</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size1"
                                defaultValue="Red"
                                id="size1_xl"
                              />
                              <label htmlFor="size1_xl">XL</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: 306, marginRight: 24 }}
                  >
                    <div className="productItem01 pi01NoRating">
                      <div className="pi01Thumb">
                        <img src="/assets/images/products/2.jpg" alt="Ulina Product" />
                        <img
                          src="/assets/images/products/2.1.jpg"
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
                          <span className="plHot">Hot</span>
                        </div>
                      </div>
                      <div className="pi01Details">
                        <h3>
                          <a href="shop_details2.html">
                            Ulina black clean t-shirt
                          </a>
                        </h3>
                        <div className="pi01Price">
                          <ins>$14</ins>
                          <del>$30</del>
                        </div>
                        <div className="pi01Variations">
                          <div className="pi01VColor">
                            <div className="pi01VCItem">
                              <input
                                type="radio"
                                name="color2"
                                defaultValue="Blue"
                                id="color2_blue"
                              />
                              <label htmlFor="color2_blue" />
                            </div>
                            <div className="pi01VCItem yellows">
                              <input
                                type="radio"
                                name="color2"
                                defaultValue="Yellow"
                                id="color2_yellow"
                              />
                              <label htmlFor="color2_yellow" />
                            </div>
                            <div className="pi01VCItem reds">
                              <input
                                type="radio"
                                name="color2"
                                defaultValue="Red"
                                id="color2_red"
                              />
                              <label htmlFor="color2_red" />
                            </div>
                          </div>
                          <div className="pi01VSize">
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size2"
                                defaultValue="Blue"
                                id="size2_s"
                              />
                              <label htmlFor="size2_s">S</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size2"
                                defaultValue="Yellow"
                                id="size2_m"
                              />
                              <label htmlFor="size2_m">M</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size2"
                                defaultValue="Red"
                                id="size2_xl"
                              />
                              <label htmlFor="size2_xl">XL</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: 306, marginRight: 24 }}
                  >
                    <div className="productItem01 pi01NoRating">
                      <div className="pi01Thumb">
                        <img src="/assets/images/products/3.jpg" alt="Ulina Product" />
                        <img
                          src="/assets/images/products/3.1.jpg"
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
                          <span className="plNew float-end">New</span>
                        </div>
                      </div>
                      <div className="pi01Details">
                        <h3>
                          <a href="shop_details1.html">Apple white jacket</a>
                        </h3>
                        <div className="pi01Price">
                          <ins>$39</ins>
                          <del>$57</del>
                        </div>
                        <div className="pi01Variations">
                          <div className="pi01VColor">
                            <div className="pi01VCItem">
                              <input
                                type="radio"
                                name="color3"
                                defaultValue="Blue"
                                id="color3_blue"
                              />
                              <label htmlFor="color3_blue" />
                            </div>
                            <div className="pi01VCItem yellows">
                              <input
                                type="radio"
                                name="color3"
                                defaultValue="Yellow"
                                id="color3_yellow"
                              />
                              <label htmlFor="color3_yellow" />
                            </div>
                            <div className="pi01VCItem reds">
                              <input
                                type="radio"
                                name="color3"
                                defaultValue="Red"
                                id="color3_red"
                              />
                              <label htmlFor="color3_red" />
                            </div>
                          </div>
                          <div className="pi01VSize">
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size3"
                                defaultValue="Blue"
                                id="size3_s"
                              />
                              <label htmlFor="size3_s">S</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size3"
                                defaultValue="Yellow"
                                id="size3_m"
                              />
                              <label htmlFor="size3_m">M</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size3"
                                defaultValue="Red"
                                id="size3_xl"
                              />
                              <label htmlFor="size3_xl">XL</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item active"
                    style={{ width: 306, marginRight: 24 }}
                  >
                    <div className="productItem01 pi01NoRating">
                      <div className="pi01Thumb">
                        <img src="/assets/images/products/4.jpg" alt="Ulina Product" />
                        <img
                          src="/assets/images/products/4.1.jpg"
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
                      </div>
                      <div className="pi01Details">
                        <h3>
                          <a href="shop_details2.html">
                            One color cotton t-shirt
                          </a>
                        </h3>
                        <div className="pi01Price">
                          <ins>$29</ins>
                        </div>
                        <div className="pi01Variations">
                          <div className="pi01VColor">
                            <div className="pi01VCItem">
                              <input
                                type="radio"
                                name="color4"
                                defaultValue="Blue"
                                id="color4_blue"
                              />
                              <label htmlFor="color4_blue" />
                            </div>
                            <div className="pi01VCItem yellows">
                              <input
                                type="radio"
                                name="color1"
                                defaultValue="Yellow"
                                id="color4_yellow"
                              />
                              <label htmlFor="color4_yellow" />
                            </div>
                            <div className="pi01VCItem reds">
                              <input
                                type="radio"
                                name="color4"
                                defaultValue="Red"
                                id="color4_red"
                              />
                              <label htmlFor="color4_red" />
                            </div>
                          </div>
                          <div className="pi01VSize">
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size4"
                                defaultValue="Blue"
                                id="size4_s"
                              />
                              <label htmlFor="size4_s">S</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size4"
                                defaultValue="Yellow"
                                id="size4_m"
                              />
                              <label htmlFor="size4_m">M</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size4"
                                defaultValue="Red"
                                id="size4_xl"
                              />
                              <label htmlFor="size4_xl">XL</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 306, marginRight: 24 }}
                  >
                    <div className="productItem01">
                      <div className="pi01Thumb">
                        <img src="/assets/images/products/5.jpg" alt="Ulina Product" />
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
                          <span className="plDis">- $49</span>
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
                                name="color5"
                                defaultValue="Blue"
                                id="color5_blue"
                              />
                              <label htmlFor="color5_blue" />
                            </div>
                            <div className="pi01VCItem yellows">
                              <input
                                type="radio"
                                name="color5"
                                defaultValue="Yellow"
                                id="color5_yellow"
                              />
                              <label htmlFor="color5_yellow" />
                            </div>
                            <div className="pi01VCItem reds">
                              <input
                                type="radio"
                                name="color5"
                                defaultValue="Red"
                                id="color5_red"
                              />
                              <label htmlFor="color5_red" />
                            </div>
                          </div>
                          <div className="pi01VSize">
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size5"
                                defaultValue="Blue"
                                id="size5_s"
                              />
                              <label htmlFor="size5_s">S</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size5"
                                defaultValue="Yellow"
                                id="size5_m"
                              />
                              <label htmlFor="size5_m">M</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size5"
                                defaultValue="Red"
                                id="size5_xl"
                              />
                              <label htmlFor="size5_xl">XL</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="owl-item"
                    style={{ width: 306, marginRight: 24 }}
                  >
                    <div className="productItem01">
                      <div className="pi01Thumb">
                        <img src="/assets/images/products/6.jpg" alt="Ulina Product" />
                        <img
                          src="/assets/images/products/6.1.jpg"
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
                          <span className="plNew float-end">New</span>
                        </div>
                      </div>
                      <div className="pi01Details">
                        <div className="productRatings">
                          <div className="productRatingWrap">
                            <div className="star-rating">
                              <span />
                            </div>
                          </div>
                          <div className="ratingCounts">13 Reviews</div>
                        </div>
                        <h3>
                          <a href="shop_details2.html">Luxury maroon sweater</a>
                        </h3>
                        <div className="pi01Price">
                          <ins>$49</ins>
                          <del>$60</del>
                        </div>
                        <div className="pi01Variations">
                          <div className="pi01VColor">
                            <div className="pi01VCItem">
                              <input
                                type="radio"
                                name="color6"
                                defaultValue="Blue"
                                id="color6_blue"
                              />
                              <label htmlFor="color6_blue" />
                            </div>
                            <div className="pi01VCItem yellows">
                              <input
                                type="radio"
                                name="color6"
                                defaultValue="Yellow"
                                id="color6_yellow"
                              />
                              <label htmlFor="color6_yellow" />
                            </div>
                            <div className="pi01VCItem reds">
                              <input
                                type="radio"
                                name="color6"
                                defaultValue="Red"
                                id="color6_red"
                              />
                              <label htmlFor="color6_red" />
                            </div>
                          </div>
                          <div className="pi01VSize">
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size6"
                                defaultValue="Blue"
                                id="size6_s"
                              />
                              <label htmlFor="size6_s">S</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size6"
                                defaultValue="Yellow"
                                id="size6_m"
                              />
                              <label htmlFor="size6_m">M</label>
                            </div>
                            <div className="pi01VSItem">
                              <input
                                type="radio"
                                name="size6"
                                defaultValue="Red"
                                id="size6_xl"
                              />
                              <label htmlFor="size6_xl">XL</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav">
                <button
                  type="button"
                  role="presentation"
                  className="owl-prev disabled"
                >
                  <i className="fa-solid fa-angle-left" />
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <i className="fa-solid fa-angle-right" />
                </button>
              </div>
              <div className="owl-dots disabled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSale;

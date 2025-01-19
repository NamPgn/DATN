import { useState } from "react";

const ProductDetail = () => {
	const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Danh sách kích thước và trạng thái khả dụng
  const sizes = [
    { size: "S", disabled: true },
    { size: "M", disabled: false },
    { size: "L", disabled: false },
    { size: "XL", disabled: true },
  ];

  const handleSizeClick = (size: string, disabled: boolean) => {
    if (!disabled) {
      setSelectedSize(size);
    }
  };
  return (
    <section className="shopDetailsPageSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="productGalleryWrap2 clearfix">
              <div className="productGalleryThumb2 slick-initialized slick-slider slick-vertical">
                <div className="slick-list draggable" style={{ height: 544 }}>
                  <div
                    className="slick-track"
                    style={{
                      opacity: 1,
                      height: 544,
                      transform: "translate3d(0px, 0px, 0px)",
                    }}
                  >
                    <div
                      className="pgtImage2 slick-slide slick-current slick-active"
                      data-slick-index={0}
                      aria-hidden="false"
                      style={{ width: 120 }}
                      tabIndex={0}
                    >
                      <img
                        src="/assets/images/product_details/t6.jpg"
                        alt="Product Image"
                      />
                    </div>
                    <div
                      className="pgtImage2 slick-slide slick-active"
                      data-slick-index={1}
                      aria-hidden="false"
                      style={{ width: 120 }}
                      tabIndex={0}
                    >
                      <img
                        src="/assets/images/product_details/t7.jpg"
                        alt="Product Image"
                      />
                    </div>
                    <div
                      className="pgtImage2 slick-slide slick-active"
                      data-slick-index={2}
                      aria-hidden="false"
                      style={{ width: 120 }}
                      tabIndex={0}
                    >
                      <img
                        src="/assets/images/product_details/t8.jpg"
                        alt="Product Image"
                      />
                    </div>
                    <div
                      className="pgtImage2 slick-slide slick-active"
                      data-slick-index={3}
                      aria-hidden="false"
                      style={{ width: 120 }}
                      tabIndex={0}
                    >
                      <img
                        src="/assets/images/product_details/t9.jpg"
                        alt="Product Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="productGallery2 slick-initialized slick-slider">
                <div className="slick-list draggable">
                  <div
                    className="slick-track"
                    style={{ opacity: 1, width: 1772 }}
                  >
                    <div
                      className="pgImage2 slick-slide slick-current slick-active"
                      data-slick-index={0}
                      aria-hidden="false"
                      style={{
                        width: 443,
                        position: "relative",
                        left: 0,
                        top: 0,
                        zIndex: 999,
                        opacity: 1,
                      }}
                      tabIndex={0}
                    >
                      <img
                        src="/assets/images/product_details/6.jpg"
                        alt="Product Image"
                      />
                    </div>
                    <div
                      className="pgImage2 slick-slide"
                      data-slick-index={1}
                      aria-hidden="true"
                      style={{
                        width: 443,
                        position: "relative",
                        left: "-443px",
                        top: 0,
                        zIndex: 998,
                        opacity: 0,
                      }}
                      tabIndex={-1}
                    >
                      <img
                        src="/assets/images/product_details/7.jpg"
                        alt="Product Image"
                      />
                    </div>
                    <div
                      className="pgImage2 slick-slide"
                      data-slick-index={2}
                      aria-hidden="true"
                      style={{
                        width: 443,
                        position: "relative",
                        left: "-886px",
                        top: 0,
                        zIndex: 998,
                        opacity: 0,
                      }}
                      tabIndex={-1}
                    >
                      <img
                        src="/assets/images/product_details/8.jpg"
                        alt="Product Image"
                      />
                    </div>
                    <div
                      className="pgImage2 slick-slide"
                      data-slick-index={3}
                      aria-hidden="true"
                      style={{
                        width: 443,
                        position: "relative",
                        left: "-1329px",
                        top: 0,
                        zIndex: 998,
                        opacity: 0,
                      }}
                      tabIndex={-1}
                    >
                      <img
                        src="/assets/images/product_details/9.jpg"
                        alt="Product Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="productContent pcMode2">
              <div className="pcCategory">
                <a href="shop_left_sidebar.html">Fashion</a>,{" "}
                <a href="shop_right_sidebar.html">Sports</a>
              </div>
              <h2>Ulina luxurious shirt for men</h2>
              <div className="pi01Price">
                <ins>$108</ins>
                <del>$120</del>
              </div>
              <div className="productRadingsStock clearfix">
                <div className="productRatings float-start">
                  <div className="productRatingWrap">
                    <div className="star-rating">
                      <span />
                    </div>
                  </div>
                  <div className="ratingCounts">52 Reviews</div>
                </div>
                <div className="productStock float-end">
                  <span>Available :</span> 12
                </div>
              </div>
              <div className="pcExcerpt">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusncididunt ut labo re et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamc oaliquip ex ea
                commodo consequa uis aute irure dolor
              </div>
              <div className="size-selector">
                <p className="text-lg font-semibold mb-2">
                  Kích thước: {selectedSize || "Chưa chọn"}
                </p>
                <div className="flex gap-3">
                  {sizes.map(({ size, disabled }) => (
                    <button
                      key={size}
                      onClick={() => handleSizeClick(size, disabled)}
                      disabled={disabled}
                      className={`w-12 h-12 border rounded-md flex items-center justify-center text-lg font-medium ${
                        disabled
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : selectedSize === size
                          ? "border-black bg-white shadow-md"
                          : "border-gray-400 bg-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pcBtns">
                <div className="quantity clearfix">
                  <button
                    type="button"
                    name="btnMinus"
                    className="qtyBtn btnMinus"
                  >
                    _
                  </button>
                  <input
                    type="number"
                    className="carqty input-text qty text"
                    name="quantity"
                  />
                  <button
                    type="button"
                    name="btnPlus"
                    className="qtyBtn btnPlus"
                  >
                    +
                  </button>
                </div>
                <button type="submit" className="ulinaBTN">
                  <span>Add to Cart</span>
                </button>
                <a href="wishlist.html" className="pcWishlist">
                  <i className="fa-solid fa-heart" />
                </a>
                <a href="javascript:void(0);" className="pcCompare">
                  <i className="fa-solid fa-right-left" />
                </a>
              </div>
              <div className="pcMeta">
                <p>
                  <span>Sku</span>
                  <a href="javascript:void(0);">3489 JE0765</a>
                </p>
                <p className="pcmTags">
                  <span>Tags:</span>
                  <a href="javascript:void(0);">Fashion</a>,{" "}
                  <a href="javascript:void(0);">Bags</a>,{" "}
                  <a href="javascript:void(0);">Girls</a>
                </p>
                <p className="pcmSocial">
                  <span>Share</span>
                  <a className="fac" href="javascript:void(0);">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                  <a className="twi" href="javascript:void(0);">
                    <i className="fa-brands fa-twitter" />
                  </a>
                  <a className="lin" href="javascript:void(0);">
                    <i className="fa-brands fa-linkedin-in" />
                  </a>
                  <a className="ins" href="javascript:void(0);">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row productContentRow">
          <div className="productOpenTab">
            <h4 className="potTitle">Description</h4>
            <div className="productDescContentArea">
              <div className="row">
                <div className="col-lg-6">
                  <div className="descriptionContent">
                    <h3>Product Details</h3>
                    <p>
                      Desectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore ma na alihote pare ei gansh
                      es gan qua.
                    </p>
                    <p>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi uet aliquip ex ea commodo consequat. Duis
                      aute irure dolor in reprehenderit in volupteat velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint
                      occaecat cupiatat non proiden re dolor in reprehend.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="descriptionContent featureCols">
                    <h3>Product Features</h3>
                    <ul>
                      <li>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium{" "}
                      </li>
                      <li>
                        Letotam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis
                      </li>
                      <li>
                        Vitae dicta sunt explicabo. Nemo enim ipsam volupta aut
                        odit aut fugit{" "}
                      </li>
                      <li>
                        Lesed quia consequuntur magni dolores eos qui ratione
                        voluptate.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="productOpenTab">
            <h4 className="potTitle">Additional Information</h4>
            <div className="additionalContentArea">
              <table>
                <tbody>
                  <tr>
                    <th>Item Code</th>
                    <td>AB42 - 2394 - DS023</td>
                  </tr>
                  <tr>
                    <th>Brand</th>
                    <td>Ulina</td>
                  </tr>
                  <tr>
                    <th>Dimention</th>
                    <td>12 Cm x 42 Cm x 20 Cm</td>
                  </tr>
                  <tr>
                    <th>Specification</th>
                    <td>1pc dress, 1 pc soap, 1 cleaner</td>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <td>2 kg</td>
                  </tr>
                  <tr>
                    <th>Warranty</th>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="productOpenTab">
            <h4 className="potTitle">Reviews</h4>
            <div className="productReviewArea">
              <div className="row">
                <div className="col-lg-6">
                  <h3>10 Reviews</h3>
                  <div className="reviewList">
                    <ol>
                      <li>
                        <div className="postReview">
                          <img
                            src="/assets/images/author/7.jpg"
                            alt="Post Review"
                          />
                          <h2>Greaet product. Packaging was also good!</h2>
                          <div className="postReviewContent">
                            Desectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore ma na alihote pare ei
                            gansh es gan quim veniam, quis nostr udg
                            exercitation ullamco laboris nisi ut aliquip
                          </div>
                          <div className="productRatingWrap">
                            <div className="star-rating">
                              <span />
                            </div>
                          </div>
                          <div className="reviewMeta">
                            <h4>John Manna</h4>
                            <span>on June 10, 2022</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="postReview">
                          <img
                            src="/assets/images/author/8.jpg"
                            alt="Post Review"
                          />
                          <h2>The item is very comfortable and soft!</h2>
                          <div className="postReviewContent">
                            Desectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore ma na alihote pare ei
                            gansh es gan quim veniam, quis nostr udg
                            exercitation ullamco laboris nisi ut aliquip
                          </div>
                          <div className="productRatingWrap">
                            <div className="star-rating">
                              <span />
                            </div>
                          </div>
                          <div className="reviewMeta">
                            <h4>Robert Thomas</h4>
                            <span>on June 10, 2022</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="postReview">
                          <img
                            src="/assets/images/author/9.jpg"
                            alt="Post Review"
                          />
                          <h2>I liked the product, it is awesome.</h2>
                          <div className="postReviewContent">
                            Desectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore ma na alihote pare ei
                            gansh es gan quim veniam, quis nostr udg
                            exercitation ullamco laboris nisi ut aliquip
                          </div>
                          <div className="productRatingWrap">
                            <div className="star-rating">
                              <span />
                            </div>
                          </div>
                          <div className="reviewMeta">
                            <h4>Ken Williams</h4>
                            <span>on June 10, 2022</span>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="commentFormArea">
                    <h3>Add A Review</h3>
                    <div className="reviewFrom">
                      <form method="post" action="#" className="row">
                        <div className="col-lg-12">
                          <div className="reviewStar">
                            <label>Your Rating</label>
                            <div className="rsStars">
                              <i className="fa-regular fa-star" />
                              <i className="fa-regular fa-star" />
                              <i className="fa-regular fa-star" />
                              <i className="fa-regular fa-star" />
                              <i className="fa-regular fa-star" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <input
                            type="text"
                            name="comTitle"
                            placeholder="Review title"
                          />
                        </div>
                        <div className="col-lg-12">
                          <textarea
                            name="comComment"
                            placeholder="Write your review here"
                            defaultValue={""}
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            name="comName"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="email"
                            name="comEmail"
                            placeholder="Your email"
                          />
                        </div>
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            name="reviewtSubmit"
                            className="ulinaBTN"
                          >
                            <span>Submit Now</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row relatedProductRow">
          <div className="col-lg-12">
            <h2 className="secTitle">More Products Like This</h2>
            <div className="row">
              <div className="col-lg-12">
                <div className="productCarousel owl-carousel owl-loaded owl-drag">
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(0px, 0px, 0px)",
                        transition: "all",
                        width: 1980,
                      }}
                    >
                      <div
                        className="owl-item active"
                        style={{ width: 306, marginRight: 24 }}
                      >
                        <div className="productItem01">
                          <div className="pi01Thumb">
                            <img
                              src="/assets/images/products/1.jpg"
                              alt="Ulina Product"
                            />
                            <img
                              src="/assets/images/products/1.1.jpg"
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

export default ProductDetail;

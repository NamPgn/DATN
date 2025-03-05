/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { getProductsByCategory } from "../../sevices/client";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "./components/pagination";
import { useState } from "react";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openOption, setopenOption] = useState(false);
  const handleClickOption = () => {
    setopenOption((open) => !open);
  };
  const { data: products } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      return (await getProductsByCategory(currentPage)).data;
    },
  });
  const totalItems = products?.total; // Tổng số sản phẩm
  const itemsPerPage = 9; // Số sản phẩm trên mỗi trang
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                    Showing <strong>1 - 16</strong> of{" "}
                    <strong>{products?.total}</strong> items
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
                        <div
                          className={`nice-select ${openOption ? "open" : ""}`}
                          onClick={handleClickOption}
                          tabIndex={0}
                        >
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
                      className={`tab-pane show active `}
                      id="grid-tab-pane"
                      role="tabpanel"
                      aria-labelledby="grid-tab"
                      tabIndex={0}
                    >
                      <div className="row ">
                        {products?.data?.map((product: any) => (
                          <div className="col-sm-6 col-xl-4">
                            <div className="productItem01">
                              <div
                                key={product.id}
                                className={`owl-item active ${
                                  !product.reviews ? "pi01NoRating" : ""
                                }`}
                              >
                                <div className="productItem01">
                                  <Link to={`/product/detail/${product.id}`}>
                                    <div className="pi01Thumb">
                                      {product?.library ? (
                                        <img
                                          src={product?.library?.url}
                                          className="w-100"
                                        />
                                      ) : (
                                        product?.product_images?.map(
                                          (item: any) => {
                                            return (
                                              <>
                                                <img
                                                  src={item.url}
                                                  className="w-100"
                                                />
                                              </>
                                            );
                                          }
                                        )
                                      )}
                                      <div className="pi01Actions">
                                        <div className="pi01Cart">
                                          <i className="fa-solid fa-shopping-cart" />
                                        </div>
                                        <div className="pi01QuickView">
                                          <i className="fa-solid fa-arrows-up-down-left-right" />
                                        </div>
                                        <div className="pi01Wishlist">
                                          <i className="fa-solid fa-heart" />
                                        </div>
                                      </div>
                                      <div className="productLabels clearfix">
                                        {/* {product.labels.map((label, index) => (
                            <span
                              key={index}
                              className={
                                label.includes("Sale") ? "plSale" : "plDis"
                              }
                            >
                              {label}
                            </span>
                          ))} */}
                                      </div>
                                    </div>
                                  </Link>
                                  <div className="pi01Details">
                                    {product.reviews !== null && (
                                      <div className="productRatings">
                                        <div className="productRatingWrap">
                                          <div className="star-rating">
                                            <span />
                                          </div>
                                        </div>
                                        <div className="ratingCounts">
                                          {product.reviews} Reviews
                                        </div>
                                      </div>
                                    )}
                                    <h3>
                                      <Link
                                        to={`/product/detail/${product.id}`}
                                      >
                                        {product.name}
                                      </Link>
                                    </h3>
                                    {product?.variants?.map((item: any) => {
                                      return (
                                        <div className="pi01Price">
                                          <ins>{item.regular_price}VND</ins>
                                          <del>{item.sale_price}VND</del>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;

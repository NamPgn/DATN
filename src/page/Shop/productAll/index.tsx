/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { getProductsByCategory } from "../../../sevices/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "../components/pagination";

const ProductAll = () => {
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
    <section className="shopPageSection">
      <div className="container">
        <div className="row shopAccessRow">
          <div className="col-sm-6 col-xl-4">
            <div className="productCount">
              Showing <strong>1 - 16</strong> of <strong>220</strong> items
            </div>
          </div>
          <div className="d-none col-lg-4 col-xl-4 d-xl-flex">
            <ul className="filterUL">
              <li className="active">All</li>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Accesories</li>
            </ul>
          </div>
          <div className="col-sm-6 col-xl-4">
            <div className="shopAccessBar">
              <div className="filterNav">
                <a href="javascript:void(0);">
                  Filter
                  <i className="fa-solid fa-sliders" />
                </a>
              </div>
              <div className="sortNav">
                <form method="post" action="#">
                  <label>Sort By</label>
                  <select name="productFilter" style={{ display: "none" }}>
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
                className="tab-pane show active"
                id="grid-tab-pane"
                role="tabpanel"
                aria-labelledby="grid-tab"
                tabIndex={0}
              >
                <div className="row">
                  {products?.data?.map((product: any) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3">
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
                                  product?.product_images?.map((item: any) => {
                                    return (
                                      <>
                                        <img src={item.url} className="w-100" />
                                      </>
                                    );
                                  })
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
                                <Link to={`/product/detail/${product.id}`}>
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
    </section>
  );
};

export default ProductAll;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { getProductsByCategory } from "../../../sevices/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import Paginations from "../components/pagination";

const ProductAll = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openOption, setopenOption] = useState(false);
  const [selectedValue, setSelectedValue] = useState(`?page=${currentPage}`);
  const handleClickOption = () => {
    setopenOption((open) => !open);
  };
  const { data: products } = useQuery({
    queryKey: ["products", selectedValue],
    queryFn: async () => {
      return (await getProductsByCategory(selectedValue)).data;
    },
  });
  const totalItems = products?.total;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const options = [
    { label: "Mặc định", value: `?page=${currentPage}` },
    { label: "Giá cao đến thấp", value: "?sort_by=high_to_low" },
    { label: "Giá thấp đến cao", value: "?sort_by=low_to_high" },
    { label: "Đánh giá cao nhất", value: "?sort_by=top_rated" },
  ];

  const handleChange = (e: any) => {
    console.log(e);
  };
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log("Selected:", value);
  };
  return (
    <section className="shopPageSection">
      <div className="container">
        <div className="row shopAccessRow">
          <div className="col-sm-6 col-xl-4">
            <div className="productCount">
              Hiển thị <strong>1 - {itemsPerPage}</strong> trên tổng số{" "}
              <strong>{products?.data?.length}</strong> sản phẩm
            </div>
          </div>
          <div className="d-none col-lg-4 col-xl-4 d-xl-flex"></div>
          <div className="col-sm-6 col-xl-4">
            <div className="shopAccessBar">
              <div className="filterNav"></div>
              <div className="sortNav">
                <div>
                  <label>Sắp xếp: </label>
                  <select
                    name="productFilter"
                    style={{ display: "none" }}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value={`?page=${currentPage}`}>Mặc định</option>
                    <option value={`?sort_by=high_to_low`}>
                      Giá cao đến thấp
                    </option>
                    <option value={`?sort_by=low_to_high`}>
                      Giá thấp đến cao
                    </option>
                    <option value={`?sort_by=top_rated`}>
                      Đánh giá cao nhất
                    </option>
                  </select>
                  <div
                    className={`nice-select ${openOption ? "open" : ""}`}
                    onClick={handleClickOption}
                    tabIndex={0}
                  >
                    <span className="current">
                      {
                        options.find((opt) => opt.value === selectedValue)
                          ?.label
                      }
                    </span>
                    <ul className={`list ${openOption ? "block" : "hidden"}`}>
                      {options.map((option) => (
                        <li
                          key={option.value}
                          data-value={option.value}
                          className={`option ${
                            selectedValue === option.value ? "selected" : ""
                          }`}
                          onClick={() => handleSelect(option.value)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
                    <div
                      className="col-sm-6 col-lg-4 col-xl-3"
                      key={product?.id}
                    >
                      <div className="productItem01">
                        <div
                          key={product.id}
                          className={`owl-item active ${
                            !product.reviews ? "pi01NoRating" : ""
                          }`}
                        >
                          <div className="productItem01">
                            <Link to={`/product/detail/${product.slug}`}>
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
                                <Link to={`/product/detail/${product.slug}`}>
                                  {product.name}
                                </Link>
                              </h3>
                              <div className="pi01Price">
                                <ins>{product.regular_price}VND</ins>
                                <del>{product.sale_price}VND</del>
                              </div>
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
        <Paginations
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ProductAll;

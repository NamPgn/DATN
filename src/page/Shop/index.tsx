/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { getProductsByCategory } from "../../sevices/client";
import { Link, useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import "rc-slider/assets/index.css";
import debounce from "lodash.debounce";
import Loading from "../../components/Loading/Loading";
import Paginations from "./components/pagination";
import {
  getCategory,
  getProductByCategory,
} from "../../sevices/client/category";
import PriceRange from "./productAll/changeRange";

const Shop = () => {
  const { id }: any = useParams();
  const [currentPage, setCurrentPage] = useState("?page=1");
  const [openOption, setopenOption] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(`${currentPage}`);
  const handleClickOption = () => {
    setopenOption((open) => !open);
  };
  const { data: products, isLoading }: any = useQuery({
    queryKey: ["products", currentPage, selectedValue],
    queryFn: async () => {
      return (await getProductsByCategory(`${selectedValue}`)).data;
    },
  });

  const options = [
    { label: "Default", value: "" },
    { label: "High to low", value: "&sort_by=high_to_low" },
    { label: "Low to high", value: "&sort_by=low_to_high" },
    { label: "Top rated", value: "&sort_by=top_rated" },
  ];
  const handleChange = (e: any) => {
    console.log(e);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    console.log(`?page=1${value}`);
  };

  const debouncedSetPrice = useCallback(
    debounce((value: any) => {
      const [min, max] = value;
      setCurrentPage(`?min_price=${min}&max_price=${max}`);
    }, 1000),
    []
  );

  const handlePriceChange = (value: any) => {
    debouncedSetPrice(value);
  };

  const { data: categoriesByProduct }: any = useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      return (await getProductByCategory(id)).data;
    },
  });

  const { data: category }: any = useQuery({
    queryKey: ["c"],
    queryFn: async () => {
      return (await getCategory()).data;
    },
  });
  const totalItems = products?.total;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleActive = () => {
    setActive((active) => !active);
  };
  console.log(category);
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
                    {category?.map((item: any) => {
                      return (
                        <li
                          className={
                            "menu-item-has-children " +
                            `${active ? "active" : ""}`
                          }
                          onClick={handleActive}
                        >
                          <a href="javascript:void(0);">{item?.name}</a>
                          <ul
                            style={{ display: `${active ? "block" : "none"}` }}
                          >
                            {item?.children.map((item: any) => {
                              return (
                                <li>
                                  <Link to={`/shop/${item?.id}`}>
                                    {item?.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
                <PriceRange
                  minPrice={0}
                  maxPrice={2000000}
                  onChange={handlePriceChange}
                />
                ;
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
                    Showing <strong>1 - {products?.data?.length}</strong> of{" "}
                    <strong>{products?.total}</strong> items
                  </div>
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
                      <div>
                        <label>Sort By</label>
                        <select
                          name="productFilter"
                          style={{ display: "none" }}
                          onChange={(e) => handleChange(e.target.value)}
                        >
                          <option value={`?page=${currentPage}`}>
                            Default
                          </option>
                          <option value={`?sort_by=high_to_low`}>
                            High to low
                          </option>
                          <option value={`?sort_by=low_to_high`}>
                            Low to high
                          </option>
                          <option value={`?sort_by=top_rated`}>
                            Top rated
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
                          <ul
                            className={`list ${
                              openOption ? "block" : "hidden"
                            }`}
                          >
                            {options.map((option) => (
                              <li
                                key={option.value}
                                data-value={option.value}
                                className={`option ${
                                  selectedValue === option.value
                                    ? "selected"
                                    : ""
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
                      className={`tab-pane show active `}
                      id="grid-tab-pane"
                      role="tabpanel"
                      aria-labelledby="grid-tab"
                      tabIndex={0}
                    >
                      {!isLoading ? (
                        <div className="row ">
                          {products?.data?.length
                            ? products?.data?.map((product: any) => (
                                <div className="col-sm-6 col-xl-4">
                                  <div className="productItem01">
                                    <div
                                      key={product.id}
                                      className={`owl-item active ${
                                        !product.reviews ? "pi01NoRating" : ""
                                      }`}
                                    >
                                      <div className="productItem01">
                                        <Link
                                          to={`/product/detail/${product.id}`}
                                        >
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
                                          <div className="pi01Price">
                                            <ins>
                                              {product.regular_price}VND
                                            </ins>
                                            <del>{product.sale_price}VND</del>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : "Không có sản phẩm"}
                        </div>
                      ) : (
                        <Loading />
                      )}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;

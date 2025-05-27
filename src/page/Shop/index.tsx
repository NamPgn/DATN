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
import { getCategory } from "../../sevices/client/category";
import PriceRange from "./productAll/changeRange";

const Shop = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState("?page=1");
  const [openOption, setopenOption] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(`${currentPage}`);
  const handleClickOption = () => {
    setopenOption((open) => !open);
  };
  const { data: products, isLoading }: any = useQuery({
    queryKey: ["products", currentPage, selectedValue, id],
    queryFn: async () => {
<<<<<<< HEAD
      return await getProductsByCategory(`${id}`, currentPage);
=======
      const params = new URLSearchParams();
      
      // Add price range parameters
      if (currentPage.includes('min_price=') && currentPage.includes('max_price=')) {
        const [minPrice, maxPrice] = currentPage.split('&').map(param => {
          const [key, value] = param.split('=');
          return value;
        });
        params.append('minPrice', minPrice);
        params.append('maxPrice', maxPrice);
      }
      
      // Add sorting parameter
      if (selectedValue !== 'default') {
        params.append('sort', selectedValue);
      }
      
      return (await getProductsByCategory(`${id}`, `?${params.toString()}`));
>>>>>>> main
    },
  });

  const options = [
    { label: "Mặc định", value: "default" },
    { label: "Giá cao đến thấp", value: "price_desc" },
    { label: "Giá thấp đến cao", value: "price_asc" },
  ];
  const handleChange = (e: any) => {
    console.log(e);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
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

  // const { data: categoriesByProduct }: any = useQuery({
  //   queryKey: ["categories", id],
  //   queryFn: async () => {
  //     return (await getProductByCategory(id)).data;
  //   },
  // });

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
                  <h3 className="widgetTitle">Danh mục</h3>
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
                                  <Link to={`/shop/${item?.slug}`}>
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
              </div>
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="row shopAccessRow">
                <div className="col-sm-6">
                  <div className="productCount">
                    Hiển thị <strong>1 - {products?.data?.length}</strong> của{" "}
                    <strong>{products?.total}</strong> sản phẩm
                  </div>
                </div>
                <div className="col-sm-6 col-xl-4">
                  <div className="shopAccessBar">
                    <div className="filterNav">
                      <a href="javascript:void(0);">
                        Lọc sản phẩm
                        <i className="fa-solid fa-sliders" />
                      </a>
                    </div>
                    <div className="sortNav">
                      <div>
                        <label>Sắp xếp</label>
                        <select
                          name="productFilter"
                          style={{ display: "none" }}
                          onChange={(e) => handleChange(e.target.value)}
                        >
                          <option value={`?page=${currentPage}`}>
                            Mặc định
                          </option>
                          <option value={`?sort_by=high_to_low`}>
                            Cao tới thấp
                          </option>
                          <option value={`?sort_by=low_to_high`}>
                            Thấp tới cao
                          </option>
                          <option value={`?sort_by=top_rated`}>Đánh giá</option>
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
                                          to={`/product/detail/${product.slug}`}
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
                                              to={`/product/detail/${product.slug}`}
                                            >
                                              {product.name}
                                            </Link>
                                          </h3>
                                          <div className="pi01Price">
                                            <ins>{product.sale_price}VND</ins>
                                            <del>
                                              {product.regular_price}VND
                                            </del>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;

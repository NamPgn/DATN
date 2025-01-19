import { Link } from "react-router-dom";

const ProductPopular = () => {
  const tabs = ["Men", "Women", "Kids", "Accessories"];
  const products = [
    {
      id: 1,
      tab: "Men",
      img1: "/assets/images/products/5.jpg",
      img2: "/assets/images/products/5.1.jpg",
      title: "Stylish white leather bag",
      price: { current: "$29", original: "$56" },
      reviews: "10 Reviews",
      labels: [{ type: "discount", value: "- $29" }, { type: "sale", value: "Sale" }],
      colors: ["Blue", "Yellow", "Red"],
      sizes: ["S", "M", "XL"],
    },
    {
      id: 2,
      tab: "Women",
      img1: "/assets/images/products/9.jpg",
      img2: "/assets/images/products/9.1.jpg",
      title: "Mini sleeve gray t-shirt",
      price: { current: "$39", original: "$60" },
      reviews: null,
      labels: [{ type: "hot", value: "Hot" }],
      colors: ["Blue", "Yellow", "Red"],
      sizes: ["S", "M", "XL"],
    },
  ];

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
              {/* Tabs */}
              <ul className="nav productTabsNav absolutes" id="productTab" role="tablist">
                {tabs.map((tab, index) => (
                  <li key={index} role="presentation">
                    <button
                      className={index === 0 ? "active" : ""}
                      id={`${tab.toLowerCase()}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${tab.toLowerCase()}-tab-pane`}
                      type="button"
                      role="tab"
                      aria-controls={`${tab.toLowerCase()}-tab-pane`}
                      aria-selected={index === 0}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
              {/* Tab Content */}
              <div className="tab-content" id="productTabContent">
                {tabs.map((tab, tabIndex) => (
                  <div
                    key={tabIndex}
                    className={`tab-pane fade ${tabIndex === 0 ? "show active" : ""}`}
                    id={`${tab.toLowerCase()}-tab-pane`}
                    role="tabpanel"
                    aria-labelledby={`${tab.toLowerCase()}-tab`}
                    tabIndex={0}
                  >
                    <div className="row">
                      {products
                        .filter((product) => product.tab === tab)
                        .map((product) => (
                          <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3">
                            <div
                              className={`productItem01 ${
                                !product.reviews ? "pi01NoRating" : ""
                              }`}
                            >
                              <div className="pi01Thumb">
                                <img src={product.img1} alt={product.title} />
                                <img src={product.img2} alt={product.title} />
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
                                  {product.labels.map((label, labelIndex) => (
                                    <span
                                      key={labelIndex}
                                      className={
                                        label.type === "discount"
                                          ? "plDis"
                                          : label.type === "sale"
                                          ? "plSale"
                                          : "plHot float-end"
                                      }
                                    >
                                      {label.value}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="pi01Details">
                                {product.reviews && (
                                  <div className="productRatings">
                                    <div className="productRatingWrap">
                                      <div className="star-rating">
                                        <span />
                                      </div>
                                    </div>
                                    <div className="ratingCounts">
                                      {product.reviews}
                                    </div>
                                  </div>
                                )}
                                <h3>
                                  <Link to="/product/detail">{product.title}</Link>
                                </h3>
                                <div className="pi01Price">
                                  <ins>{product.price.current}</ins>
                                  <del>{product.price.original}</del>
                                </div>
                                <div className="pi01Variations">
                                  <div className="pi01VColor">
                                    {product.colors.map((color, colorIndex) => (
                                      <div
                                        key={colorIndex}
                                        className={`pi01VCItem ${
                                          color.toLowerCase() === "yellow"
                                            ? "yellows"
                                            : color.toLowerCase() === "red"
                                            ? "reds"
                                            : ""
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          name={`color_${product.id}`}
                                          id={`color_${product.id}_${colorIndex}`}
                                          defaultValue={color}
                                        />
                                        <label htmlFor={`color_${product.id}_${colorIndex}`} />
                                      </div>
                                    ))}
                                  </div>
                                  <div className="pi01VSize">
                                    {product.sizes.map((size, sizeIndex) => (
                                      <div key={sizeIndex} className="pi01VSItem">
                                        <input
                                          type="radio"
                                          name={`size_${product.id}`}
                                          id={`size_${product.id}_${sizeIndex}`}
                                          defaultValue={size}
                                        />
                                        <label htmlFor={`size_${product.id}_${sizeIndex}`}>
                                          {size}
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPopular;

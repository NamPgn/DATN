import { Link } from "react-router-dom";
import ProductContent from "../ProductContent";

const ProductPopular = () => {
  const tabs = ["Men", "Women", "Kids", "Accessories"];
  const products = [
    {
      image1: "/assets/images/products/1.jpg",
      image2: "/assets/images/products/1.1.jpg",
      title: "Men’s blue cotton t-shirt",
      price: 49,
      oldPrice: 60,
      discount: 49,
      reviews: 10,
      colors: ["blue", "yellow", "red"],
      sizes: ["S", "M", "XL"],
      detailsLink: "shop_details1.html",
    },
    {
      image1: "/assets/images/products/2.jpg",
      image2: "/assets/images/products/2.1.jpg",
      title: "Women’s cotton dress",
      price: 39,
      oldPrice: 50,
      discount: 39,
      reviews: 5,
      colors: ["green", "black", "white"],
      sizes: ["S", "M", "L"],
      detailsLink: "shop_details2.html",
    },
    // Add more products as needed
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
              <ProductContent products={products}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPopular;

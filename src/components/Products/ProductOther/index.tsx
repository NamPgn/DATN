import React from "react";
import ProductContent from "../ProductContent";

const ProductOther = () => {
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
  return <ProductContent products={products} />;
};

export default ProductOther;

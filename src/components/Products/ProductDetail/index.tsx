import { useState } from "react";
import Description from "./description";

const ProductDetail = () => {
  const images = [
    {
      thumbnail: "/assets/images/product_details/t6.jpg",
      fullImage: "/assets/images/product_details/6.jpg",
    },
    {
      thumbnail: "/assets/images/product_details/t7.jpg",
      fullImage: "/assets/images/product_details/7.jpg",
    },
    {
      thumbnail: "/assets/images/product_details/t8.jpg",
      fullImage: "/assets/images/product_details/8.jpg",
    },
    {
      thumbnail: "/assets/images/product_details/t9.jpg",
      fullImage: "/assets/images/product_details/9.jpg",
    },
  ];
  const [currentImage, setCurrentImage] = useState(images[0].fullImage);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    comment: "",
    name: "",
    email: "",
    rating: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Black"];
  const tags = ["Fashion", "Bags", "Girls"];
  const socialLinks = [
    { platform: "facebook", icon: "fa-facebook-f", color: "#3b5998" },
    { platform: "twitter", icon: "fa-twitter", color: "#00acee" },
    { platform: "linkedin", icon: "fa-linkedin-in", color: "#0077b5" },
    { platform: "instagram", icon: "fa-instagram", color: "#e4405f" },
  ];

  const handleSizeChange = (e: any) => setSelectedSize(e.target.value);
  const handleColorChange = (e: any) => setSelectedColor(e.target.value);
  const handleQuantityChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  const handleImageClick = (fullImage: any) => {
    setCurrentImage(fullImage);
  };
  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const product = {
    category: ["Fashion", "Sports"],
    title: "Ulina luxurious shirt for men",
    price: {
      original: "$120",
      discounted: "$108",
    },
    rating: {
      average: 5,
      reviews: 52,
    },
    stock: 12,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating: any) => {
    setFormData({
      ...formData,
      rating,
    });
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
                    {/* Lặp qua mảng để hiển thị các ảnh thumbnail */}
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`pgtImage2 slick-slide ${
                          image.fullImage == currentImage ? "border" : ""
                        }`}
                        aria-hidden="false"
                        style={{ width: 120 }}
                        tabIndex={0}
                        onClick={() => handleImageClick(image.fullImage)}
                      >
                        <img
                          src={image.thumbnail}
                          alt={`Product Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="productGallery2 slick-initialized slick-slider">
                <div className="slick-list draggable">
                  <div
                    className="slick-track"
                    style={{ opacity: 1, width: 1772 }}
                  >
                    {/* Hiển thị ảnh chính */}
                    <div
                      className="pgImage2 slick-slide slick-current slick-active"
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
                      <img src={currentImage} alt="Product Image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="productContent pcMode2">
              <div className="pcCategory">
                {product.category.map((cat, index) => (
                  <span key={index}>
                    <a href={`#${cat.toLowerCase()}`}>{cat}</a>
                    {index < product.category.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <h2>{product.title}</h2>
              <div className="pi01Price">
                <ins>{product.price.discounted}</ins>
                <del>{product.price.original}</del>
              </div>
              <div className="productRadingsStock clearfix">
                <div className="productRatings float-start">
                  <div className="productRatingWrap">
                    <div className="star-rating">
                      <span
                        style={{
                          width: `${(product.rating.average / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="ratingCounts">
                    {product.rating.reviews} Reviews
                  </div>
                </div>
                <div className="productStock float-end">
                  <span>Available: </span> {product.stock}
                </div>
              </div>
              <div className="pcExcerpt">{product.description}</div>
              <aside className="widget sizeFilter mb-4">
                <h3 className="widgetTitle">Size</h3>
                <div className="productSizeWrap">
                  {sizes.map((size) => (
                    <div className="pswItem" key={size}>
                      <input
                        type="radio"
                        name="ws_1"
                        value={size}
                        id={`ws_${size}`}
                        checked={selectedSize === size}
                        onChange={handleSizeChange}
                      />
                      <label htmlFor={`ws_${size}`}>{size}</label>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Color Filter */}
              <div className="pcVariation">
                <span>Color</span>
                <div className="pcvContainer">
                  {colors.map((color) => (
                    <div
                      className={`pi01VCItem ${color.toLowerCase()}s`}
                      key={color}
                    >
                      <input
                        type="radio"
                        name="color_4_6"
                        value={color}
                        id={`color_4_6251_1_${color.toLowerCase()}`}
                        checked={selectedColor === color}
                        onChange={handleColorChange}
                      />
                      <label
                        htmlFor={`color_4_6251_1_${color.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pcBtns">
                <div className="quantity clearfix">
                  <button
                    type="button"
                    name="btnMinus"
                    className="qtyBtn btnMinus z-3"
                    onClick={() => handleQuantityDecrease()}
                  >
                    _
                  </button>
                  <input
                    type="number"
                    className="carqty input-text qty text"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    type="button"
                    name="btnPlus"
                    className="qtyBtn btnPlus"
                    onClick={handleQuantityIncrease}
                  >
                    +
                  </button>
                </div>
                <button type="submit" className="ulinaBTN">
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="pcMeta">
                <p>
                  <span>Sku</span>
                  <div>3489 JE0765</div>
                </p>
                <p className="pcmTags">
                  <span>Tags:</span>
                  {tags.map((tag, index) => (
                    <span key={index}>
                      <a>{tag}</a>
                      {index < tags.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="pcmSocial">
                  <span>Share</span>
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      style={{ color: link.color }}
                      className={link.platform}
                    >
                      <i className={`fa-brands ${link.icon}`} />
                    </a>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Description
          product={product}
          handleRatingChange={handleRatingChange}
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </section>
  );
};

export default ProductDetail;

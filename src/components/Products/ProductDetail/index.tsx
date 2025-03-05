import { useEffect, useState } from "react";
import Description from "./description";
import { useQuery } from "react-query";
import { getProductsDetailClient } from "../../../sevices/products";
import { Link, useParams } from "react-router-dom";
const tags = ["Fashion", "Bags", "Girls"];
const socialLinks = [
  { platform: "facebook", icon: "fa-facebook-f", color: "#3b5998" },
  { platform: "twitter", icon: "fa-twitter", color: "#00acee" },
  { platform: "linkedin", icon: "fa-linkedin-in", color: "#0077b5" },
  { platform: "instagram", icon: "fa-instagram", color: "#e4405f" },
];
const ProductDetail = () => {
  const { id } = useParams();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      return (await getProductsDetailClient(id)).data;
    },
  });
  const [currentImage, setCurrentImage] = useState<any>(null);

  useEffect(() => {
    if (products?.product_images?.length) {
      setCurrentImage(products.product_images[0].url);
    }
  }, [products]);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const handleSizeSelect = (sizeId: number) => {
    setSelectedSize(sizeId);
    const variant = products?.variants.find((v: any) =>
      v.values.some((val: any) => val.attribute_value_id === sizeId)
    );
    setSelectedVariant(variant || null);
  };
  const [formData, setFormData] = useState({
    title: "",
    comment: "",
    name: "",
    email: "",
    rating: 0,
  });
  const [quantity, setQuantity] = useState(1);
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

  const sizes = [
    ...new Set(
      products?.variants?.flatMap((v: any) =>
        v.values
          .map((val: any) => val.attribute_value)
          .filter((attr: any) => !attr.name.includes("Màu"))
      )
    ).values(),
  ];
  const colors = [
    ...new Map(
      products?.variants
        ?.flatMap((v: any) =>
          v.values
            .map((val: any) => val.attribute_value)
            .filter((attr: any) => attr.name.includes("Màu"))
        )
        .map((attr: any) => [attr.id, attr])
    ).values(),
  ];
  const handleSubmit = () => {
    console.log(formData);
  };
  if (isLoading) return "Sản phẩm đang tải";
  return (
    <section className="shopDetailsPageSection">
      <div className="container">
        <div className="d-flex gap-2">
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
                    {products?.product_images?.map(
                      (image: any, index: number) => (
                        <div
                          key={image.id}
                          className={`pgtImage2 slick-slide ${
                            image.url === currentImage ? "border" : ""
                          }`}
                          aria-hidden="false"
                          style={{ width: 120 }}
                          tabIndex={0}
                          onClick={() => handleImageClick(image.url)}
                        >
                          <img
                            src={image.url}
                            alt={`Product Image ${index + 1}`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="productGallery2 slick-initialized slick-slider">
                <div className="draggable">
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
              <h2>{products?.name}</h2>
              {selectedVariant ? (
                <>
                  <div className="pi01Price">
                    <ins>
                      {selectedVariant.regular_price.toLocaleString()} đ
                    </ins>
                  </div>
                  <div className="productRadingsStock clearfix">
                    <div className="productRatings float-start">
                      <div className="productRatingWrap">
                        <div className="star-rating">
                          <span
                            style={{
                              width: `${(products.rating?.average / 5) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="ratingCounts">
                        {products.rating?.reviews} Reviews
                      </div>
                    </div>
                    <div className="productStock float-end">
                      <span>Available: </span> {selectedVariant.stock_quantity}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="pcExcerpt">{products?.short_description}</div>
              <aside className="widget sizeFilter mb-4">
                <h3 className="widgetTitle">Size</h3>
                <div className="productSizeWrap d-flex gap-2 flex-wrap">
                  {sizes.map((size: any) => (
                    <div
                      key={size.id}
                      className={`btn btn-[#9ebbbd] ${
                        selectedSize === size.id ? "active" : ""
                      }`}
                      onClick={() => handleSizeSelect(size.id)}
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              </aside>

              {/* Color Filter */}
              <div className="pcVariation">
                <span>Color</span>
              </div>
              <div className="mb-3">
                <div className="btn-group" role="group">
                  {colors.map((color: any) => (
                    <div
                      key={color.id}
                      className={`btn  ${
                        selectedColor === color.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedColor(color.id)}
                    >
                      {color.name}
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
                {selectedVariant && selectedColor ? (
                  <button onClick={handleSubmit} className="ulinaBTN">
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  "  "
                )}
              </div>

              <div className="pcMeta">
                <span>Sku: {selectedVariant?.sku}</span>
                <div className="pcCategory my-4">
                  {products?.categories?.map((cat: any, index: any) => (
                    <span key={index}>
                      <Link to={""}>
                        {cat.name}
                        {","}{" "}
                      </Link>
                    </span>
                  ))}
                </div>
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
          product={products}
          handleRatingChange={handleRatingChange}
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </section>
  );
};

export default ProductDetail;

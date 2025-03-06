import { useEffect, useMemo, useState } from "react";
import Description from "./description";
import { useQuery } from "react-query";
import { getProductsDetailClient } from "../../../sevices/products";
import { Link, useParams } from "react-router-dom";
const socialLinks = [
  { platform: "facebook", icon: "fa-facebook-f", color: "#3b5998" },
  { platform: "twitter", icon: "fa-twitter", color: "#00acee" },
  { platform: "linkedin", icon: "fa-linkedin-in", color: "#0077b5" },
  { platform: "instagram", icon: "fa-instagram", color: "#e4405f" },
];
const products = {
  id: 1,
  name: "Áo Thun Nam Họa Tiết In Excursion Mighty Bear Form Regular",
  description: "<p>Áo thun xịn của mình</p>",
  short_description: "Áo thun xịn của mình",
  url_main_image:
    "https://res.cloudinary.com/dkrn3fe2o/image/upload/w_800,h_800,c_thumb/v1739066961/fwuyeublz9dda716tfpi.webp",
  type: "0",
  slug: "ao-thun-nam-hoa-tiet-in-excursion-mighty-bear-form-regular",
  variants: [
    {
      id: 1,
      sku: "PRD2",
      regular_price: 300000,
      sale_price: 199000,
      weight: 120,
      stock_quantity: 230,
      values: [
        {
          attribute_id: 1,
          attribute_name: "Màu sắc",
          attribute_value_id: 1,
          value: "Màu đỏ",
        },
        {
          attribute_id: 2,
          attribute_name: "Kích thước",
          attribute_value_id: 7,
          value: "36",
        },
      ],
    },
    {
      id: 2,
      sku: "PRD2",
      regular_price: 300000,
      sale_price: 189000,
      weight: 200,
      stock_quantity: 90,
      values: [
        {
          attribute_id: 1,
          attribute_name: "Màu sắc",
          attribute_value_id: 1,
          value: "Màu đỏ",
        },
        {
          attribute_id: 2,
          attribute_name: "Kích thước",
          attribute_value_id: 8,
          value: "37",
        },
        {
          attribute_id: 3,
          attribute_name: "Chất Liệu",
          attribute_value_id: 1,
          value: "Cotton",
        },
      ],
    },
  ],

  categories: ["Áo", "Áo thun"],
  product_images: [
    {
      url: "https://res.cloudinary.com/dkrn3fe2o/image/upload/w_800,h_800,c_thumb/v1739066958/ovmdtlu6ihcldyx9jckg.jpg",
    },
    {
      url: "https://res.cloudinary.com/dkrn3fe2o/image/upload/w_800,h_800,c_thumb/v1739066964/wjhxgmfpytbtvbfne5yu.webp",
    },
    {
      url: "https://res.cloudinary.com/dkrn3fe2o/image/upload/w_800,h_800,c_thumb/v1739066967/yq6mviubta0ujkpngjyr.jpg",
    },
    {
      url: "https://res.cloudinary.com/dkrn3fe2o/image/upload/w_800,h_800,c_thumb/v1739066970/qjzs2nnqfcj2dqns4mx9.jpg",
    },
  ],
};
const ProductDetail = () => {
  const { id } = useParams();
  // const { data: products, isLoading } = useQuery({
  //   queryKey: ["products", id],
  //   queryFn: async () => {
  //     return (await getProductsDetailClient(id)).data;
  //   },
  // });
  const [currentImage, setCurrentImage] = useState<any>(null);

  useEffect(() => {
    if (products?.product_images?.length) {
      setCurrentImage(products.product_images[0].url);
    }
  }, [products]);
  const [selectedVariants, setSelectedVariants]: any = useState<{
    [key: string]: number | null;
  }>({});
  const handleSelect = (
    groupName: string,
    item: { id: number; name: string }
  ) => {
    setSelectedVariants((prev: any) => ({
      ...prev,
      [groupName]: prev[groupName]?.id === item.id ? null : item,
    }));
  };
  const selectedVariantss = useMemo(() => {
    return products.variants.find((variant) =>
      variant.values.every((val) =>
        Object.values(selectedVariants).some(
          (selected: any) => selected?.id === val.attribute_value_id
        )
      )
    );
  }, [selectedVariants]);
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

  const variantGroups: Record<string, any[]> = {};

  products?.variants?.forEach((variant: any) => {
    variant.values.forEach((val: any) => {
      const attributeName = val.attribute_name;

      // Nếu nhóm chưa có, khởi tạo mảng rỗng
      if (!variantGroups[attributeName]) {
        variantGroups[attributeName] = [];
      }

      if (
        !variantGroups[attributeName].some(
          (item) => item.id === val.attribute_value_id
        )
      ) {
        variantGroups[attributeName].push({
          id: val.attribute_value_id,
          name: val.value,
        });
      }
    });
  });

  const handleSubmit = () => {
    console.log(formData);
  };
  // if (isLoading) return "Sản phẩm đang tải";
  return (
    <section className="shopDetailsPageSection">
      <div className="container">
        <div className="d-flex gap-2">
          <div className="col-lg-6">
            <div className="productGalleryWrap2 clearfix">
              <div className="productGalleryThumb2 slick-initialized slick-slider slick-vertical">
                <div className="draggable" style={{ height: 544 }}>
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
              {selectedVariantss ? (
                <>
                  <div className="pi01Price">
                    <ins>
                      {selectedVariantss.regular_price.toLocaleString()} đ
                    </ins>
                  </div>
                  <div className="productRadingsStock clearfix">
                    <div className="productRatings float-start">
                      {/* <div className="productRatingWrap">
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
                      </div> */}
                    </div>
                    <div className="productStock float-end">
                      <span>Available: </span>{" "}
                      {selectedVariantss.stock_quantity}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="pcExcerpt">{products?.short_description}</div>
              {Object.entries(variantGroups).map(([groupName, values]) => (
                <aside key={groupName} className="widget sizeFilter mb-4 d-flex gap-3" style={{ alignItems:"center" }}>
                  <div className="">{groupName}:</div>
                  <div className="productSizeWrap d-flex gap-2 flex-wrap">
                    {values.map((item: any) => {
                      const isSelected =
                        selectedVariants[groupName]?.id === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`variant-btn ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => handleSelect(groupName, item)}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                </aside>
              ))}

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
                {selectedVariantss ? (
                  <button onClick={handleSubmit} className="ulinaBTN">
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  "  "
                )}
              </div>

              <div className="pcMeta">
                <span>Sku: {selectedVariantss?.sku}</span>
                <div className="pcCategory my-4">
                  {products?.categories?.map((cat: any, index: any) => (
                    <span key={index}>
                      <Link to={""}>
                        {cat}
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import Description from "./description";
import { Link, useParams } from "react-router-dom";
import Quantity from "../Quantity";
import { useCart } from "../../../context/Cart/cartContext";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { getProductsDetailClient } from "../../../sevices/products";
import { userCartAdd } from "../../../sevices/client/cart";
import { token_auth } from "../../../common/auth/getToken";
import { socialLinks } from "../../../constant";
import Loading from "../../Loading/Loading";
import TailwindComponent from "../../Tailwind/TailwinComponent";
import styles from "./styles.module.css";

const ProductDetail = () => {
  const token_ = token_auth();
  const { id } = useParams();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      return (await getProductsDetailClient(id)).data;
    },
  });
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [filteredVariantGroups, setFilteredVariantGroups] = useState<{
    [key: string]: any[];
  }>({});
  const [selectedVariants, setSelectedVariants]: any = useState<{
    [key: string]: number | null;
  }>({});
  const [formData, setFormData] = useState({
    title: "",
    comment: "",
    name: "",
    email: "",
    rating: 0,
  });
  const { addToCart, refetchCart }: any = useCart();
  const [quantity, setQuantity] = useState(1);
  const { mutate: addCartApi } = useMutation({
    mutationFn: async (data: any) => {
      return await userCartAdd(data);
    },
  });

  useEffect(() => {
    if (products?.product_images?.length) {
      setCurrentImage(products.product_images[0].url);
    }
    let newVariantGroups: { [key: string]: any[] } = {};
    if (Object.keys(selectedVariants).length === 0) {
      products?.variants?.forEach((variant: any) => {
        variant.values.forEach((val: any) => {
          const attributeName = val.attribute_name;

          if (!newVariantGroups[attributeName]) {
            newVariantGroups[attributeName] = [];
          }

          if (
            !newVariantGroups[attributeName].some(
              (item) => item.id === val.attribute_value_id
            )
          ) {
            newVariantGroups[attributeName].push({
              id: val.attribute_value_id,
              name: val.value,
            });
          }
        });
      });

      setFilteredVariantGroups(newVariantGroups);
      return;
    }
    //lọc tất cả biến thể theo thằng tên
    const filteredVariants = products.variants.filter((variant: any) =>
      Object.entries(selectedVariants).every(([key, selected]: any) =>
        variant.values.some(
          (val: any) =>
            val?.attribute_name === key &&
            val?.attribute_value_id === selected?.id
        )
      )
    );

    filteredVariants.forEach((variant: any) => {
      variant.values.forEach((val: any) => {
        const attributeName = val.attribute_name;

        if (!newVariantGroups[attributeName]) {
          newVariantGroups[attributeName] = [];
        }

        if (
          !newVariantGroups[attributeName].some(
            (item) => item.id === val.attribute_value_id
          )
        ) {
          newVariantGroups[attributeName].push({
            id: val.attribute_value_id,
            name: val.value,
          });
        }
      });
    });

    setFilteredVariantGroups(newVariantGroups);
  }, [selectedVariants, products?.variants]);
  const handleSelect = (groupName: string, item: any) => {
    setSelectedVariants((prev: any) => {
      const isAlreadySelected = prev[groupName]?.id === item.id; //tìm thằng đã có trong cái mảng đấy
      const newSelected = isAlreadySelected //nếu mà có thằng mới thì remove thằng cũ đê
        ? Object.fromEntries(
          Object.entries(prev).filter(([key]) => key !== groupName)
        )
        : { ...prev, [groupName]: item };

      return newSelected;
    });
  };
  const selectedVariantss: any = useMemo(() => {
    //tìm thằng varian đã chọn cho vào mảng
    return products?.variants?.find((variant: any) =>
      variant.values.every((val: any) =>
        Object.values(selectedVariants).some(
          (selected: any) => selected?.id === val.attribute_value_id
        )
      )
    );
  }, [selectedVariants, products]);
  const handleImageClick = (fullImage: any) => {
    setCurrentImage(fullImage);
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


  const variantGroups: Record<string, any[]> = {}; //tìm ra tất cả biến thể đã có trong cái mảng

  products?.variants?.forEach((variant: any) => {
    variant.values.forEach((val: any) => {
      const attributeName = val.attribute_name;

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
    if (token_) {
      const dataProduct0 = {
        quantity,
        variant_id: selectedVariantss?.id,
        product_id: id,
        stock_quantity: selectedVariantss?.stock_quantity,
      };
      const dataProduct1 = {
        quantity,
        variant_id: products?.variants[0]?.id,
        product_id: id,
        stock_quantity: products?.variants[0]?.stock_quantity,
      };
      if (products?.type == "1") {
        addCartApi(dataProduct1, {
          onSuccess: () => {
            toast.success("Thêm giỏ hàng thành công");
            refetchCart();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message);
          },
        });
      } else {
        if (selectedVariantss !== undefined) {
          addCartApi(dataProduct0, {
            onSuccess: () => {
              toast.success("Thêm giỏ hàng thành công");
              refetchCart();
            },
            onError: (error: any) => {
              toast.error(error?.response?.data?.message);
            },
          });
        } else {
          toast.error("Thêm đầy đủ thông tin");
        }
      }
    } else {
      const dataProduct0 = {
        quantity,
        variant_id: selectedVariantss?.id,
        product_id: id,
        stock_quantity: selectedVariantss?.stock_quantity,
      };
      const dataProduct1 = {
        quantity,
        variant_id: products?.variants[0]?.id,
        stock_quantity: products?.variants[0]?.stock_quantity,
      };

      let success;
      if (products?.type == "1") {
        success = addToCart(dataProduct1);
      } else {
        if (selectedVariantss !== undefined) {
          success = addToCart(dataProduct0);
        } else {
          toast.error("Thêm đầy đủ thông tin");
          return;
        }
      }

      if (success) {
        toast.success("Thêm giỏ hàng thành công");
      }
    }
  };

  if (isLoading) return <Loading />;
  return (
    <TailwindComponent>
      <section className={styles.container + " container"}>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.grid}>
              {/* Left Column - Product Images */}
              <div className={styles.flex}>
                {/* Thumbnails */}
                <div className={styles.thumbnailContainer}>
                  {products?.product_images?.map((image: any, index: number) => (
                    <div
                      key={image.id}
                      onClick={() => handleImageClick(image.url)}
                      className={`${styles.thumbnail} ${image.url === currentImage ? styles.thumbnailActive : ""}`}
                    >
                      <img
                        src={image.url}
                        alt={`Product ${index + 1}`}
                        className={styles.thumbnailImage}
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
                <div className={styles.mainImage}>
                  <img
                    src={currentImage}
                    alt="Product"
                  />
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className={styles.flexCol}>
                <h1 className={styles.title}>
                  {products?.name}
                </h1>

                {selectedVariantss && (
                  <div className={styles.priceContainer}>
                    {/* Price */}
                    <div className={styles.price}>
                      <span className={styles.priceValue}>
                        {(selectedVariantss.sale_price ?? selectedVariantss.regular_price).toLocaleString()} đ
                      </span>
                      {selectedVariantss.sale_price && (
                        <span className={styles.originalPrice}>
                          {selectedVariantss.regular_price.toLocaleString()} đ
                        </span>
                      )}
                    </div>

                    {/* Stock */}
                    <div className={styles.stock}>
                      <span className={styles.stockLabel}>Số lượng:</span>
                      <span className={styles.stockValue}>
                        {selectedVariantss.stock_quantity}
                      </span>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className={styles.description}>
                  {products?.short_description}
                </div>

                {/* Variants */}
                <div className={styles.variants}>
                  {Object.entries(filteredVariantGroups).map(([groupName, values]) => (
                    <div key={groupName} className={styles.variantGroup}>
                      <span className={styles.variantLabel}>{groupName}:</span>
                      <div className={styles.variantOptions}>
                        {values.map((item: any) => {
                          const isSelected = selectedVariants[groupName]?.id === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelect(groupName, item)}
                              className={`${styles.variantButton} ${isSelected ? styles.variantButtonActive : ""}`}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity and Add to Cart */}
                <div className={styles.cartSection}>
                  <div className={styles.cartControls}>
                    <div className={styles.quantityWrapper}>
                      <Quantity
                        quantity={quantity}
                        stock={selectedVariantss?.stock_quantity}
                        setQuantity={setQuantity}
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className={styles.addToCart}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>

                {/* Meta Information */}
                <div className={styles.metaInfo}>
                  <div className={styles.sku}>
                    <span>Mã sản phẩm:</span>
                    <span className={styles.skuValue}>{selectedVariantss?.sku}</span>
                  </div>

                  {/* Categories */}
                  <div className={styles.categories}>
                    {products?.categories?.map((cat: any, index: any) => (
                      <Link
                        key={index}
                        to={""}
                        className={styles.categoryLink}
                      >
                        {cat}
                        {index < products.categories.length - 1 ? "," : ""}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Share */}
                <div className={styles.socialShare}>
                  <span className={styles.socialLabel}>Chia sẻ:</span>
                  <div className={styles.socialLinks}>
                    {socialLinks?.map((link, index) => (
                      <a
                        key={index}
                        href="#"
                        className={styles.socialLink}
                        style={{ color: link.color }}
                      >
                        <i className={`fa-brands ${link.icon}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <Description
              product={products}
              handleRatingChange={handleRatingChange}
              handleInputChange={handleInputChange}
              formData={formData}
            />
          </div>
        </div>
      </section>
    </TailwindComponent>
  );
};

export default ProductDetail;

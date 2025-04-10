import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getProductsClient } from "../../../sevices/products";

const ProductSale = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return (await getProductsClient()).data;
    },
  });

  return (
    <section className="latestArrivalSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="secTitle">SẢN PHẨM MỚI</h2>
            <p className="secDesc">
              Hiển thị sản phẩm mới nhất của chúng tôi trong mùa hè này
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="productCarousel owl-carousel owl-loaded owl-drag">
              <div
                className="owl-stage-outer gap-5"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                }}
              >
                {products?.length
                  ? products?.map((product: any) => (
                      <div
                        key={product.id}
                        className={`owl-item active ${
                          !product.reviews ? "pi01NoRating" : ""
                        }`}
                      >
                        <div className="productItem01">
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
                              <Link to={`/product/detail/${product.id}`}>
                                {product.name}
                              </Link>
                            </h3>
                            <div className="pi01Price">
                              <ins>
                                {product?.sale_price
                                  ? product?.sale_price
                                  : product?.regular_price}
                                VND
                              </ins>
                              {product?.sale_price && (
                                <del>{product?.regular_price + "VND"}</del>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : "Không có sản phẩm"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSale;

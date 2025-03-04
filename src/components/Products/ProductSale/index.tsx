import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getProductsClient } from "../../../sevices/products";

const ProductSale = () => {
  const product = [
    {
      id: 1,
      name: "Men’s blue cotton t-shirt",
      price: "$49",
      oldPrice: "$60",
      image1: "/assets/images/products/1.jpg",
      image2: "/assets/images/products/1.1.jpg",
      labels: ["- $49", "Sale"],
      reviews: 10,
    },
    {
      id: 2,
      name: "Ulina black clean t-shirt",
      price: "$14",
      oldPrice: "$30",
      image1: "/assets/images/products/2.jpg",
      image2: "/assets/images/products/2.1.jpg",
      labels: ["Hot"],
      reviews: 10,
    },
  ];

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
            <h2 className="secTitle">Latest Arrival</h2>
            <p className="secDesc">Showing our latest arrival on this summer</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="productCarousel owl-carousel owl-loaded owl-drag">
              <div className="owl-stage-outer">
                {products?.map((product: any) => (
                  <div
                    key={product.id}
                    className={`owl-item active ${
                      !product.reviews ? "pi01NoRating" : ""
                    }`}
                    style={{ width: 306, marginRight: 24 }}
                  >
                    <div className="productItem01">
                      <Link to={`/product/detail/${product.id}`}>
                        <div className="pi01Thumb">
                          {product?.product_images?.map((item: any) => {
                            return (
                              <>
                                <img src={item.url} />
                              </>
                            );
                          })}
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
                          <Link to={`/product/detail/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <div className="pi01Price">
                          <ins>{product.price}</ins>
                          <del>{product.oldPrice}</del>
                        </div>
                      </div>
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

export default ProductSale;

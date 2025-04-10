/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { getProductsSearch } from "../../../sevices/client";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Paginations from "../components/pagination";

const ProductSearch = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products-search", keyword, currentPage],
    queryFn: async () => {
      const res = await getProductsSearch(keyword, currentPage);
      console.log("Search results:", res.data);
      return res.data;
    },
    enabled: !!keyword,
  });

  const totalItems = products?.total || 0;
  const itemsPerPage = 9;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1;

  return (
    <section className="shopPageSection">
      <div className="container">
        <h2 className="text-center mb-4">
          Kết quả tìm kiếm của bạn: "{keyword}"
        </h2>

        {isLoading && <p>Loading products...</p>}
        {isError && <p>Error fetching products.</p>}
        {!isLoading && !isError && products?.data?.length === 0 && (
          <p className="text-center">No products found.</p>
        )}

        <div className="row shopProductRow">
          <div className="col-lg-12">
            <div className="tab-content productViewTabContent">
              <div className="tab-pane show active">
                <div className="row">
                  {products?.data?.map((product: any) => (
                    <div
                      key={product.id}
                      className="col-sm-6 col-lg-4 col-xl-3"
                    >
                      <div className="productItem01">
                        <Link to={`/product/detail/${product.slug}`}>
                          <div className="pi01Thumb">
                            {product?.library ? (
                              <img
                                src={product?.library?.url}
                                className="w-100"
                              />
                            ) : (
                              product?.product_images?.map(
                                (item: any, index: number) => (
                                  <img
                                    key={index}
                                    src={item.url}
                                    className="w-100"
                                  />
                                )
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
                          </div>
                        </Link>
                        <div className="pi01Details">
                          <h3>
                            <Link to={`/product/detail/${product.slug}`}>
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Paginations
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ProductSearch;

import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getProductsClient } from "../../../sevices/products";
import TailwindComponent from "../../Tailwind/TailwinComponent";

const ProductSale = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return (await getProductsClient()).data;
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <TailwindComponent>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">SẢN PHẨM MỚI</h2>
            <p className="text-gray-600">
              Hiển thị sản phẩm mới nhất của chúng tôi trong mùa hè này
            </p>
          </div>

          {products?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((product: any) => (
                <div key={product.id} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {product?.library ? (
                        <img
                          src={product.library.url}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        product?.product_images?.[0] && (
                          <img
                            src={product.product_images[0].url}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                        )
                      )}

                      {product.sale_price && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            SALE
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                        <Link
                          to={`/product/detail/${product.id}`}
                          className="hover:text-[#ee4d2d] transition-colors duration-200"
                        >
                          {product.name}
                        </Link>
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="text-[#ee4d2d] font-bold">
                          {formatPrice(product?.sale_price || product?.regular_price)}
                        </span>
                        {product?.sale_price && (
                          <span className="text-gray-400 text-sm line-through">
                            {formatPrice(product?.regular_price)}
                          </span>
                        )}
                      </div>

                      {product.reviews !== null && (
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className="w-4 h-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Không có sản phẩm</div>
          )}
        </div>
      </section>

    </TailwindComponent>
  );
};

export default ProductSale;

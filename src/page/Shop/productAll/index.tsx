import { useQuery } from "react-query";
import { getProducts } from "../../../sevices/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import TailwindComponent from "../../../components/Tailwind/TailwinComponent";

const ProductAll = () => {
  const [openOption, setopenOption] = useState(false);
  const [selectedValue, setSelectedValue] = useState("default");

  const { data: products } = useQuery({
    queryKey: ["products", selectedValue],
    queryFn: async () => {
      return (await getProducts(selectedValue));
    },
  });

  const options = [
    { label: "Mặc định", value: "default" },
    { label: "Giá cao đến thấp", value: "price_desc" },
    { label: "Giá thấp đến cao", value: "price_asc" },
  ];

  const handleClickOption = () => {
    setopenOption((open) => !open);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <TailwindComponent>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tất cả sản phẩm
            </h2>
            <p className="text-gray-600">
              Hiển thị tất cả sản phẩm của chúng tôi trong mùa hè này
            </p>
          </div>

          <div className="mb-8 flex justify-end">
            <div className="relative">
              <button
                onClick={handleClickOption}
                className="flex items-center justify-between w-64 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span>
                  {options.find((opt) => opt.value === selectedValue)?.label}
                </span>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {openOption && (
                <div className="absolute right-0 z-10 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={`block w-full px-4 py-2 text-sm text-left ${
                          selectedValue === option.value
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        role="menuitem"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {products?.data?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
              {products.data.map((product: any) => (
                <div key={product.slug} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={product.url}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />

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
                          to={`/product/detail/${product.slug}`}
                          className="hover:text-[#ee4d2d] transition-colors duration-200"
                        >
                          {product.name}
                        </Link>
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="text-[#ee4d2d] font-bold">
                          {formatPrice(product.final_price)}
                        </span>
                        {product.sale_price !== null && (
                          <span className="text-gray-400 text-sm line-through">
                            {formatPrice(product.regular_price)}
                          </span>
                        )}
                      </div>
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

export default ProductAll;

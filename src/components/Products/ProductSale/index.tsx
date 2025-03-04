import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../../constant";
import { getHomes } from "../../../sevices/home";

const ProductSale = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getHomes(); // Gọi API lấy sản phẩm mới nhất
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="latestArrivalSection">
      <div className="container">
        <h2 className="secTitle">Latest Arrival</h2>
        <p className="secDesc">Showing our latest arrival this summer</p>
        <div
          className="productGrid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Tự động điều chỉnh số cột
            gap: "16px", // Khoảng cách giữa các sản phẩm
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="productItem"
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div className="productImage">
                <img
                  src={product.library?.url || "/default-image.jpg"}
                  alt={product.name}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              </div>
              <div className="productDetails">
                <h3>
                  <Link to={`/product/detail/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <div className="price">
                  <ins>${product.variants[0]?.sale_price ?? "N/A"}</ins>
                  {product.variants[0]?.regular_price && (
                    <del>${product.variants[0]?.regular_price}</del>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSale;

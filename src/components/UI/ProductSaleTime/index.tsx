import { Link } from "react-router-dom";
import { useGetProductSale } from "../../../hook/products";

const ProductSaleTime = () => {
  const { data } = useGetProductSale()?.data || { data: undefined };
  return (
    <section className="dealProductSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="dealProductContent">
              <h5>Sản phẩm giảm giá</h5>
              <h2>{data?.data?.product?.name}</h2>
              <p>{data?.data?.product?.short_description}</p>
              <div className="dpcPriceWrap">
                <div className="pi01Price">
                  <ins>${data?.data?.sale_price}</ins>
                  <del>${data?.data?.regular_price}</del>
                </div>
              </div>
              <Link
                to={"/product/detail/" + data?.data?.product?.slug}
                className="ulinaBTN"
              >
                <span>Mua ngay</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="dealProductImage">
              <img
                src={`/assets/images/home1/7.png`}
                alt={data?.data?.product?.name}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSaleTime;

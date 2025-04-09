import ProductSale from "../../../components/Products/ProductSale";
import FeatureSection from "../../../components/UI/FeatureSection";
import ProductSaleTime from "../../../components/UI/ProductSaleTime";
import { getVouchers } from "../../../sevices/client/voucher";

const HomePage = () => {
  return (
    <div>
      <FeatureSection vouchers={getVouchers} />
      <ProductSale />
      <ProductSaleTime />
    </div>
  );
};

export default HomePage;

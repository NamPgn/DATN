import ProductSale from "../../../components/Products/ProductSale";
import FeatureSection from "../../../components/UI/FeatureSection";
import LookBookSection from "../../../components/UI/LookBookSection";
import ProductSaleTime from "../../../components/UI/ProductSaleTime";


const HomePage = () => {
  return (
    <div>
      <FeatureSection />
      <ProductSale />
      <LookBookSection />
      <ProductSaleTime />
    </div>
  );
};

export default HomePage;

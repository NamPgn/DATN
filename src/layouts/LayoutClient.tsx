import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import SlideShow from "../components/UI/SlideShow";
import Breadcrumb from "../components/UI/Breadcrumb";

const LayoutClient = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Breadcrumb />
      {pathname == "/" && (
        <SlideShow />
      )}
      <div className="mt-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutClient;

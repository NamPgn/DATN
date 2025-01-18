import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import BannerSectionMain from "../components/UI/Banner/BannerSectionTeam";
import SlideShow from "../components/UI/SlideShow";

const LayoutClient = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      {pathname == "/" ? (
        <SlideShow />
      ) : (
        <BannerSectionMain pathName={pathname} />
      )}
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutClient;

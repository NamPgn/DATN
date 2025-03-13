import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
const Layout = () => {
  return (
    <>
      <div style={{ zIndex: "-1" }}>
        <Header />
        <div style={{ marginTop:"100px" }}>
        <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

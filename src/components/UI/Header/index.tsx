/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchUi from "../Search";
import AuthHeader from "./auth";
import { UsersContext } from "../../../context/usersContext";
import { useCart } from "../../../context/Cart/cartContext";
const menuItems = [
  { name: "Trang chủ", path: "/" },
  { name: "Giới thiệu", path: "/about" },
  {
    name: "Danh mục",
    path: "#",
    class: "menu-item-has-children",
  },
  { name: "Sản phẩm", path: "/products" },
  { name: "Liên hệ", path: "/contact" },
  { name: "Tra cứu đơn hàng", path: "/o/tracking" },
];

const socialIcons = [
  {
    name: "Facebook",
    className: "fa-brands fa-facebook-f",
    link: "#",
    color: "#3b5998",
  },
  {
    name: "Twitter",
    className: "fa-brands fa-twitter",
    link: "#",
    color: "#00acee",
  },
  {
    name: "LinkedIn",
    className: "fa-brands fa-linkedin-in",
    link: "#",
    color: "#0077b5",
  },
  {
    name: "Instagram",
    className: "fa-brands fa-instagram",
    link: "#",
    color: "#e4405f",
  },
];
const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [data, setData]: any = useState([]);
  const { cartLocal }: any = useCart() || {};
  useEffect(() => {
    (async () => {
      const res: any = await axios.get("http://127.0.0.1:8000/api/categories");
      setData(res.data);
    })();
  }, []);
  const { isLogin }: any = useContext(UsersContext) || {};
  const handleClickOpenPopupSearch = () => {
    setOpenSearch((val) => !val);
  };
  return (
    <>
      <header className="header01 isSticky ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="headerInner01">
                {/* Logo */}
                <div className="logo">
                  <Link to="/">
                    <img
                      style={{
                        width: "150%",
                        height: "100px",
                        paddingBottom: "20px",
                        background: "transparent",
                      }}
                      src="/assets/images/logo.jpg"
                      alt="Ulina"
                    />
                  </Link>
                </div>

                {/* Main Menu */}
                <div className="mainMenu">
                  <ul>
                    {menuItems.map((item: any, index) => (
                      <li key={index} className={item.class}>
                        <Link to={item.path}>{item.name}</Link>

                        {item.class ? (
                          <ul className="submenu">
                            {data?.map((category: any) => {
                              return (
                                <li
                                  key={category.slug}
                                  className={`${
                                    category?.children?.length > 0
                                      ? item.class
                                      : " "
                                  }`}
                                >
                                  <Link to={`/shop/${category.slug}`}>
                                    {category.name}
                                  </Link>
                                  {category?.children?.length > 0 ? (
                                    <ul key={category?.slug}>
                                      {category?.children?.map((child: any) => {
                                        return (
                                          <li key={child?.slug}>
                                            <Link to={`/shop/${child.slug}`}>
                                              {child.name}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Access Navigation */}
                <div className="accessNav" style={{ alignItems: "center" }}>
                  {/* Menu Toggler */}
                  <a href="#" className="menuToggler">
                    <i className="fa-solid fa-bars" /> <span>Menu</span>
                  </a>

                  {/* Social Icons */}
                  <div className="anSocial">
                    <div className="ansWrap">
                      {socialIcons.map((icon, index) => (
                        <a
                          key={index}
                          className={icon.name.toLowerCase()}
                          href={icon.link}
                          style={{ color: icon.color }}
                        >
                          <i className={icon.className} />
                        </a>
                      ))}
                    </div>
                    <a className="tog" href="#">
                      <i className="fa-solid fa-share-alt" />
                    </a>
                  </div>

                  {/* Action Items */}
                  <div className="anItems" style={{ alignItems: "center" }}>
                    <div
                      className="anSearch"
                      style={{ cursor: "pointer" }}
                      onClick={handleClickOpenPopupSearch}
                    >
                      <i
                        className="fa-solid fa-search"
                        style={{ color: "black" }}
                      />
                    </div>
                    <div className="anUser">
                      <div className="anUser">
                        {isLogin ? (
                          <AuthHeader />
                        ) : (
                          <Link to={"/auth/login"}>
                            <i className="fa-solid fa-user" />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="anCart">
                      <Link to="/cart">
                        <i className="fa-solid fa-shopping-cart"></i>
                        <span>{(cartLocal && cartLocal.length) || 0}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Support Info */}
                  <div className="anSupport">
                    <i className="fa-solid fa-headset" />
                    <h3>Liên Hệ</h3>
                    <h3>0389794435</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SearchUi onOpen={openSearch} onClose={setOpenSearch} />
    </>
  );
};

export default Header;

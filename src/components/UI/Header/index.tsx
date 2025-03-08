/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchUi from "../Search";
import AuthHeader from "./auth";
import { UsersContext } from "../../../context/usersContext";
const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Categories",
    path: "/shop",
    class: "menu-item-has-children",
  },
  { name: "Products", path: "/products" },
  { name: "Contacts", path: "/contact" },
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
  useEffect(() => {
    (async () => {
      const res: any = await axios.get("http://127.0.0.1:8000/api/categories");
      setData(res.data);
    })();
  }, []);
  const { isLogin }: any = useContext(UsersContext) || {};


  const cartProducts = [
    {
      id: 1,
      name: "Ulina luxurious bag for men women",
      price: 19.0,
      image: "/assets/images/cart/1.jpg",
      detailsLink: "/shop_details1",
    },
    {
      id: 2,
      name: "Nasio stainless steel watch",
      price: 41.0,
      image: "/assets/images/cart/2.jpg",
      detailsLink: "/shop_details1",
    },
  ];

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
                    <img src="/assets/images/logo.png" alt="Ulina" />
                  </Link>
                </div>

                {/* Main Menu */}
                <div className="mainMenu">
                  <ul>
                    {menuItems.map((item: any, index) => (
                      <li key={index} className={item.class}>
                        <Link to={item.path}>{item.name}</Link>
                        {item.class &&
                          data?.map((category: any) => {
                            return (
                              <ul className="submenu" key={category.id}>
                                <li className="menu-item-has-children">
                                  <Link to={`/shop/${category.slug}`}>
                                    {category.name}
                                  </Link>
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
                                </li>
                              </ul>
                            );
                          })}
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
                      <i className="fa-solid fa-search" />
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
                      <Link to="">
                        <i className="fa-solid fa-shopping-cart"></i>
                        <span>{cartProducts.length}</span>
                      </Link>
                      <div className="cartWidgetArea">
                        {cartProducts.map((product) => (
                          <div className="cartWidgetProduct" key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <Link to={product.detailsLink}>{product.name}</Link>
                            <div className="cartProductPrice clearfix">
                              <span className="price">
                                <span>
                                  <span>$</span>
                                  {product.price.toFixed(2)}
                                </span>
                              </span>
                            </div>
                            <a href="#" className="cartRemoveProducts">
                              <i className="fa-solid fa-xmark" />
                            </a>
                          </div>
                        ))}
                        <div className="totalPrice">
                          Subtotal:{" "}
                          <span className="price">
                            <span>
                              <span>$</span>
                              {cartProducts
                                .reduce(
                                  (sum, product) => sum + product.price,
                                  0
                                )
                                .toFixed(2)}
                            </span>
                          </span>
                        </div>
                        <div className="cartWidgetBTN clearfix">
                          <Link className="cart" to="/cart">
                            View Cart
                          </Link>
                          <Link className="checkout" to="/checkout">
                            Checkout
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support Info */}
                  <div className="anSupport">
                    <i className="fa-solid fa-headset" />
                    <h3>Helpline</h3>
                    <h3>+123 - 456 - 7890</h3>
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

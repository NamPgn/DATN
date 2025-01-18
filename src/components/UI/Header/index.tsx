import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header01 isSticky">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="headerInner01">
              <div className="logo">
                <Link to="/">
                  <img src="/assets/images/logo.png" alt="Ulina" />
                </Link>
              </div>
              <div className="mainMenu">
                <ul>
                  <li className="">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li className="">
                    <Link to="/shop">Shop</Link>
                  </li>
                  {/* <li className="menu-item-has-children">
                    <a href="javascript:void(0);">Blog</a>
                    <ul>
                      <li className="menu-item-has-children">
                        <a href="javascript:void(0);">Blog Standard</a>
                        <ul>
                          <li>
                            <a href="blog_standard_lsb.html">Left Sidebar</a>
                          </li>
                          <li>
                            <a href="blog_standard_nsb.html">No Sidebar</a>
                          </li>
                          <li>
                            <a href="blog_standard_rsb.html">Right Sidebar</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="javascript:void(0);">Blog Grid</a>
                        <ul>
                          <li>
                            <a href="blog_grid_lsb.html">Left Sidebar</a>
                          </li>
                          <li>
                            <a href="blog_grid_nsb.html">No Sidebar</a>
                          </li>
                          <li>
                            <a href="blog_grid_rsb.html">Right Sidebar</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="javascript:void(0);">Blog Details</a>
                        <ul>
                          <li>
                            <a href="blog_details_lsb.html">Left Sidebar</a>
                          </li>
                          <li>
                            <a href="blog_details_nsb.html">No Sidebar</a>
                          </li>
                          <li>
                            <a href="blog_details_rsb.html">Right Sidebar</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li> */}
                  <li>
                    <Link to="/contact">Contacts</Link>
                  </li>
                </ul>
              </div>
              <div className="accessNav">
                <a href="javascript:void(0);" className="menuToggler">
                  <i className="fa-solid fa-bars" /> <span>Menu</span>
                </a>
                <div className="anSocial">
                  <div className="ansWrap">
                    <a className="fac" href="javascript:void(0);">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                    <a className="twi" href="javascript:void(0);">
                      <i className="fa-brands fa-twitter" />
                    </a>
                    <a className="lin" href="javascript:void(0);">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                    <a className="ins" href="javascript:void(0);">
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </div>
                  <a className="tog" href="javascript:void(0);">
                    <i className="fa-solid fa-share-alt" />
                  </a>
                </div>
                <div className="anSelects">
                  <div className="anSelect">
                    <select name="languages" style={{ display: "none" }}>
                      <option value="ENG">EN</option>
                      <option value="ARA">AR</option>
                      <option value="GER">GR</option>
                      <option value="SPA">SP</option>
                    </select>
                    <div className="nice-select" tabIndex={0}>
                      <span className="current">EN</span>
                      <ul className="list">
                        <li data-value="ENG" className="option selected">
                          EN
                        </li>
                        <li data-value="ARA" className="option">
                          AR
                        </li>
                        <li data-value="GER" className="option">
                          GR
                        </li>
                        <li data-value="SPA" className="option">
                          SP
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="anSelect">
                    <select name="currency" style={{ display: "none" }}>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
                      <option value="OMR">OMR</option>
                    </select>
                    <div className="nice-select" tabIndex={0}>
                      <span className="current">USD</span>
                      <ul className="list">
                        <li data-value="USD" className="option selected">
                          USD
                        </li>
                        <li data-value="GBP" className="option">
                          GBP
                        </li>
                        <li data-value="EUR" className="option">
                          EUR
                        </li>
                        <li data-value="OMR" className="option">
                          OMR
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="anItems">
                  <div className="anSearch">
                    <a href="javascript:void(0);">
                      <i className="fa-solid fa-search" />
                    </a>
                  </div>
                  <div className="anUser">
                    <a href="javascript:void(0);">
                      <i className="fa-solid fa-user" />
                    </a>
                  </div>
                  <div className="anCart">
                    <a href="javascript:void(0);">
                      <i className="fa-solid fa-shopping-cart" />
                      <span>3</span>
                    </a>
                    <div className="cartWidgetArea">
                      <div className="cartWidgetProduct">
                        <img
                          src="/assets/images/cart/1.jpg"
                          alt="Marine Design"
                        />
                        <a href="shop_details1.html">
                          Ulina luxurious bag for men women
                        </a>
                        <div className="cartProductPrice clearfix">
                          <span className="price">
                            <span>
                              <span>$</span>19.00
                            </span>
                          </span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="cartRemoveProducts"
                        >
                          <i className="fa-solid fa-xmark" />
                        </a>
                      </div>
                      <div className="cartWidgetProduct">
                        <img
                          src="/assets/images/cart/2.jpg"
                          alt="Draped Neck"
                        />
                        <a href="shop_details1.html">
                          Nasio stainless steel watch
                        </a>
                        <div className="cartProductPrice clearfix">
                          <span className="price">
                            <span>
                              <span>$</span>41.00
                            </span>
                          </span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="cartRemoveProducts"
                        >
                          <i className="fa-solid fa-xmark" />
                        </a>
                      </div>
                      <div className="cartWidgetProduct">
                        <img
                          src="/assets/images/cart/3.jpg"
                          alt="Long Pleated"
                        />
                        <a href="shop_details1.html">
                          Winner men’s comfortable t-shirt
                        </a>
                        <div className="cartProductPrice clearfix">
                          <span className="price">
                            <span>
                              <span>$</span>52.00
                            </span>
                          </span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="cartRemoveProducts"
                        >
                          <i className="fa-solid fa-xmark" />
                        </a>
                      </div>
                      <div className="totalPrice">
                        Subtotal:{" "}
                        <span className="price">
                          <span>
                            <span>$</span>112.00
                          </span>
                        </span>
                      </div>
                      <div className="cartWidgetBTN clearfix">
                        <Link className="cart" to="/cart">
                          View Cart
                        </Link>
                        <Link className="checkout" to="/cart">
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
  );
};

export default Header;

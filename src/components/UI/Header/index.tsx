import { Link } from "react-router-dom";

const Header = () => {
  // Dữ liệu động cho menu
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contacts", path: "/contact" },
  ];

  // Dữ liệu động cho icon mạng xã hội
  const socialIcons = [
    { name: "Facebook", className: "fa-brands fa-facebook-f", link: "#" },
    { name: "Twitter", className: "fa-brands fa-twitter", link: "#" },
    { name: "LinkedIn", className: "fa-brands fa-linkedin-in", link: "#" },
    { name: "Instagram", className: "fa-brands fa-instagram", link: "#" },
  ];
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
  return (
    <header className="header01 isSticky">
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
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Access Navigation */}
              <div className="accessNav">
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
                <div className="anItems">
                  <div className="anSearch">
                    <a href="#">
                      <i className="fa-solid fa-search" />
                    </a>
                  </div>
                  <div className="anUser">
                    <a href="#">
                      <i className="fa-solid fa-user" />
                    </a>
                  </div>
                  <div className="anCart">
                    <a href="#">
                      <i className="fa-solid fa-shopping-cart" />
                      <span>{cartProducts.length}</span>
                    </a>
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
                              .reduce((sum, product) => sum + product.price, 0)
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
  );
};

export default Header;

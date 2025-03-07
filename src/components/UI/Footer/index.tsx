const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <aside className="widget aboutWidget">
              <div className="footerLogo">
                <a href="index.html">
                  <img src="/assets/images/logo2.png" alt="Ulina" />
                </a>
              </div>
              <div className="aboutWidContent">
                Quis nostrud exercitatin ullamc boris nisi ut aliquip ex ea
                commodo conse.
              </div>
              <div className="subscribForm">
                <form method="post" action="#">
                  <input
                    type="email"
                    name="subsEmail"
                    placeholder="Your email here"
                  />
                  <button type="submit">
                    <i className="fa-solid fa-envelope" />
                  </button>
                </form>
              </div>
            </aside>
          </div>
          <div className="col-lg-3 col-md-6">
            <aside className="widget">
              <h3 className="widgetTitle">Address</h3>
              <div className="addressContent">
                <div className="singleAddress">
                  <i className="fa-solid fa-location-dot" />
                  20, Awesome Road, New York, Usa 4D BS3
                </div>
                <div className="singleAddress">
                  <i className="fa-solid fa-phone" />
                  +123 456 7890
                </div>
                <div className="singleAddress">
                  <i className="fa-solid fa-envelope" />
                  <a href="mailto:hello@ulina.com">hello@ulina.com</a>
                </div>
              </div>
            </aside>
          </div>
          <div className="col-lg-2 col-md-6">
            <aside className="widget">
              <h3 className="widgetTitle">Useful Links</h3>
              <ul>
                <li>
                  <a href="javascript:void(0);">Shop Coupon</a>
                </li>
                <li>
                  <a href="about.html">About us</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Carrer</a>
                </li>
                <li>
                  <a href="javascript:void(0);">Supports</a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="col-lg-3 col-md-6">
            <aside className="widget twoColMenu">
              <h3 className="widgetTitle">Categories</h3>
              <ul>
                <li>
                  <a href="shop_full_width.html">Men</a>
                </li>
                <li>
                  <a href="shop_left_sidebar.html">Bags</a>
                </li>
                <li>
                  <a href="shop_right_sidebar.html">Women</a>
                </li>
                <li>
                  <a href="shop_full_width.html">Jewellery</a>
                </li>
                <li>
                  <a href="shop_left_sidebar.html">Kids</a>
                </li>
                <li>
                  <a href="shop_left_sidebar.html">Cloths</a>
                </li>
                <li>
                  <a href="shop_right_sidebar.html">Accesories</a>
                </li>
                <li>
                  <a href="shop_full_width.html">Beauty Items</a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <div className="row footerAccessRow">
          <div className="col-md-6">
            <div className="footerSocial">
              <a href="javascript:void(0);">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-twitter" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-linkedin-in" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-instagram" />
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footerPayments">
              <a href="javascript:void(0);">
                <i className="fa-brands fa-cc-paypal" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-cc-stripe" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-cc-mastercard" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-cc-visa" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-cc-apple-pay" />
              </a>
              <a href="javascript:void(0);">
                <i className="fa-brands fa-cc-amazon-pay" />
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="footerBar" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

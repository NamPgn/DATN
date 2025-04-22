const Footer = () => {
  const links = [
    {
      title: "Danh mục",
      items: [
        { text: "Nam", href: "shop_full_width.html" },
        { text: "Nữ", href: "shop_right_sidebar.html" },
        { text: "Quần áo", href: "shop_left_sidebar.html" },
      ],
    },
  ];

  const socialIcons = ["facebook-f", "twitter", "linkedin-in", "instagram"];
  const paymentIcons = [
    "paypal",
    "stripe",
    "mastercard",
    "visa",
    "apple-pay",
    "amazon-pay",
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <aside className="widget aboutWidget">
              {/* <div className="footerLogo">
                <a href="index.html">
                  <img src="/assets/images/logo.jpg" alt="Ulina" />
                </a>
              </div> */}
              <div className="aboutWidContent">
                Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho bạn.
              </div>
              <div className="subscribForm">
                <form method="post" action="#">
                  <input
                    type="email"
                    name="subsEmail"
                    placeholder="Nhập email của bạn"
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
              <h3 className="widgetTitle">Địa chỉ</h3>
              <div className="addressContent">
                {["location-dot", "phone", "envelope"].map((icon, i) => (
                  <div className="singleAddress" key={i}>
                    <i className={`fa-solid fa-${icon}`} />
                    {icon === "envelope" ? (
                      <a href="mailto:phuongminhhoang77@gmail.com">
                        phuongminhhoang77@gmail.com
                      </a>
                    ) : icon === "phone" ? (
                      "+84 796 385 112"
                    ) : (
                      "Trường Sơn, Lục Nam, Bắc Giang"
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </div>
          {links.map((link, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <aside className="widget">
                <h3 className="widgetTitle">{link.title}</h3>
                <ul>
                  {link.items.map((item, idx) => (
                    <li key={idx}>
                      <a href={item.href}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          ))}
        </div>
        <div className="row footerAccessRow">
          <div className="col-md-6 footerSocial">
            {socialIcons.map((icon, i) => (
              <a href="#" key={i}>
                <i className={`fa-brands fa-${icon}`} />
              </a>
            ))}
          </div>
          <div className="col-md-6 footerPayments">
            {paymentIcons.map((icon, i) => (
              <a href="#" key={i}>
                <i className={`fa-brands fa-cc-${icon}`} />
              </a>
            ))}
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

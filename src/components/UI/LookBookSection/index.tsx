import React from "react";

const LookBookSection = () => {
  return (
    <section className="lookbookSection">
      <div className="container">
        <div
          className="row masonryGrid shuffle"
          id="masonryGrid"
          style={{
            position: "relative",
            overflow: "hidden",
            height: 908,
            transition: "height 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            className="col-md-6 col-xl-4 shafItem shuffle-item shuffle-item--visible"
            style={{
              position: "absolute",
              top: 0,
              visibility: "visible",
              willChange: "transform",
              left: 0,
              opacity: 1,
              transitionDuration: "250ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionProperty: "transform, opacity",
            }}
          >
            <div className="lookBook01 lb01M0 overLayAnim01">
              <div className="lbContent">
                <h3>Get 40% Off</h3>
                <h2>Man’s Latest Collection</h2>
                <a href="collections.html" className="ulinaLink">
                  <i className="fa-solid fa-angle-right" />
                  Shop Now
                </a>
              </div>
              <img src="/assets/images/home1/1.png" alt="Mans Latest Collection" />
            </div>
          </div>
          <div
            className="col-md-6 col-xl-4 shafItem shuffle-item shuffle-item--visible"
            style={{
              position: "absolute",
              top: 0,
              visibility: "visible",
              willChange: "transform",
              left: 0,
              opacity: 1,
              transform: "translate(440px, 0px) scale(1)",
              transitionDuration: "250ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionProperty: "transform, opacity",
            }}
          >
            <div className="lookBook01 lb01M1 overLayAnim01">
              <div className="lbContent">
                <h3>Couple Fashion</h3>
                <h2>Best Collection for Stylish Couple</h2>
                <a href="collections.html" className="ulinaLink">
                  <i className="fa-solid fa-angle-right" />
                  Explore Now
                </a>
              </div>
              <img src="/assets/images/home1/2.png" alt="Mans Latest Collection" />
            </div>
          </div>
          <div
            className="col-md-6 col-xl-4 shafItem shuffle-item shuffle-item--visible"
            style={{
              position: "absolute",
              top: 0,
              visibility: "visible",
              willChange: "transform",
              left: 0,
              opacity: 1,
              transform: "translate(880px, 0px) scale(1)",
              transitionDuration: "250ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionProperty: "transform, opacity",
            }}
          >
            <div className="lookBook01 lb01M2 overLayAnim01">
              <div className="lbContent">
                <h3>Be Stylish</h3>
                <h2>Girl’s Latest Fashion</h2>
                <a href="collections.html" className="ulinaLink">
                  <i className="fa-solid fa-angle-right" />
                  Shop Now
                </a>
              </div>
              <img src="/assets/images/home1/3.png" alt="Mans Latest Collection" />
            </div>
          </div>
          <div
            className="col-md-6 col-xl-4 shafItem shuffle-item shuffle-item--visible"
            style={{
              position: "absolute",
              top: 0,
              visibility: "visible",
              willChange: "transform",
              left: 0,
              opacity: 1,
              transform: "translate(0px, 344px) scale(1)",
              transitionDuration: "250ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionProperty: "transform, opacity",
            }}
          >
            <div className="lookBook01 lb01M3 overLayAnim01">
              <img src="/assets/images/home1/4.png" alt="Mans Latest Collection" />
              <div className="lbContent">
                <h3>New Arrival</h3>
                <h2>Exclusive Shoes Collection</h2>
                <a href="collections.html" className="ulinaLink">
                  <i className="fa-solid fa-angle-right" />
                  Explore Now
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-md-6 col-xl-4 shafItem shuffle-item shuffle-item--visible"
            style={{
              position: "absolute",
              top: 0,
              visibility: "visible",
              willChange: "transform",
              left: 0,
              opacity: 1,
              transform: "translate(880px, 344px) scale(1)",
              transitionDuration: "250ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionProperty: "transform, opacity",
            }}
          >
            <div className="lookBook01 lb01M4 overLayAnim01">
              <div className="lbContent">
                <h3>New in 2022</h3>
                <h2>Discover New Bag Collection</h2>
                <a href="collections.html" className="ulinaLink">
                  <i className="fa-solid fa-angle-right" />
                  Explore Now
                </a>
              </div>
              <img src="/assets/images/home1/6.png" alt="Mans Latest Collection" />
            </div>
          </div>
          <div
            className="col-md-6 col-xl-4 shafItem shuffle-item shuffle-item--visible"
            style={{
              position: "absolute",
              top: 0,
              visibility: "visible",
              willChange: "transform",
              left: 0,
              opacity: 1,
              transform: "translate(440px, 564px) scale(1)",
              transitionDuration: "250ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionProperty: "transform, opacity",
            }}
          >
            <div className="lookBook01 lb01M5 overLayAnim01">
              <div className="lbContent">
                <h3>Get 40% Off</h3>
                <h2>Ulina Trendy Sunglass</h2>
                <a href="collections.html" className="ulinaLink">
                  <i className="fa-solid fa-angle-right" />
                  Shop Now
                </a>
              </div>
              <img src="/assets/images/home1/5.png" alt="Mans Latest Collection" />
            </div>
          </div>
          <div className="col-lg-1 col-sm-1 shafSizer" />
        </div>
      </div>
    </section>
  );
};

export default LookBookSection;

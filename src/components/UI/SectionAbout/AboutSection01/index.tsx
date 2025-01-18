const AboutSection01 = () => {
  return (
    <section className="aboutPageSection01">
      <div className="container">
        <div className="row mb117">
          <div className="col-xl-6 noPaddingRight">
            <div className="aboutImage">
              <div className="aiImgRow clearfix">
                <img
                  className="float-start aiImg01"
                  src="/assets/images/about/1.jpg"
                  alt="About Ulina"
                />
                <img
                  className="float-end aiImg02"
                  src="/assets/images/about/2.jpg"
                  alt="About Ulina"
                />
              </div>
              <div className="aiImgRow clearfix">
                <img
                  className="float-start aiImg03"
                  src="/assets/images/about/3.jpg"
                  alt="About Ulina"
                />
                <img
                  className="float-end aiImg04"
                  src="/assets/images/about/4.jpg"
                  alt="About Ulina"
                />
              </div>
              <div className="aiCounter">
                <h2 className="timer" data-count={12}>
                  12
                </h2>
                <h3>Successful Years</h3>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="aboutContent">
              <h3 className="secSubTitle text-capitalize">About us</h3>
              <h2 className="secTitle">
                A World Leading &amp; Popular Online Shopping Solution Provider.
              </h2>
              <div className="abcCounters">
                <div className="circleProgressWrap">
                  <div
                    className="circleProgress"
                    data-skills="0.75"
                    data-emptyfill="#ecf5f4"
                    data-fills="#9ebbbd"
                  >
                    <canvas width={96} height={96} />
                    <h3>75%</h3>
                  </div>
                </div>
                <p>
                  Mation ullamco laboris nisi ut alior in rep rehend er fugiat
                  nulla pariatur.
                </p>
              </div>
              <div className="abDesc">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspicia tis unde omni od tempor incididunt ut labore.
              </div>
              <div className="row mb41px">
                <div className="col-md-6">
                  <div className="iconBox02">
                    <i className="ulina-refund tm1" />
                    <h4>Easy Returns</h4>
                    <p>Be enim ad minim in veniam ami tomader</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="iconBox02 ib_Last">
                    <i className="ulina-credit-card" />
                    <h4>Secure Payments</h4>
                    <p>Eonim ad minim venim liquip tomad</p>
                  </div>
                </div>
              </div>
              <a className="ulinaBTN" href="javascript: void(0);">
                <span>Read More</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="counterArea">
              <div className="row">
                <div className="col-md-4">
                  <div className="singleCounter02">
                    <h2>
                      <span className="timer" data-count={120}>
                        120
                      </span>
                      <span className="timerSuffix">K</span>
                    </h2>
                    <h3>
                      Total <br />
                      Products
                    </h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="singleCounter02">
                    <h2>
                      <span className="timer" data-count={2}>
                        2
                      </span>
                      <span className="timerSuffix">K</span>
                    </h2>
                    <h3>
                      Worldwide <br />
                      Customers
                    </h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="singleCounter02">
                    <h2>
                      <span className="timer" data-count={10}>
                        10
                      </span>
                      <span className="timerSuffix">K</span>
                    </h2>
                    <h3>
                      Completed <br />
                      Orders
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection01;

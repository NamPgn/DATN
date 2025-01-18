const FeatureSection = () => {
  return (
    <section
      className="featureSection"
      style={{
        margin: "100px 0 0 0",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xl-3">
            <div className="iconBox01">
              <i className="ulina-fast-delivery" />
              <h3>Free Shipping</h3>
              <p>Ut enim ad minim veniam liquip ami tomader</p>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="iconBox01">
              <i className="ulina-credit-card tm5" />
              <h3>Secure Payments</h3>
              <p>Eonim ad minim veniam liquip tomader</p>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="iconBox01">
              <i className="ulina-refund tm1" />
              <h3>Easy Returns</h3>
              <p>Be enim ad minim veniam liquipa ami tomader</p>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="iconBox01">
              <i className="ulina-hours-support t1" />
              <h3>24/7 Support</h3>
              <p>Ut enim ad minim veniam liquip ami tomader</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

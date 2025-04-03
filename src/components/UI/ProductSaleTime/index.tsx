const ProductSaleTime = () => {
  return (
    <section className="dealProductSection">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="dealProductContent">
              <h5>Featured Product</h5>
              <h2>Ulima Fashionable Jeans</h2>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequa uis aute irure
                dolor{" "}
              </p>
              <div className="dpcPriceWrap">
                <div className="pi01Price">
                  <ins>$199</ins>
                  <del>$399</del>
                </div>
                <a href="shop_details1.html" className="ulinaBTN">
                  <span>Buy Now</span>
                </a>
              </div>
              <div className="countDownWrap">
                <h6>Ends in</h6>
                <div
                  className="ulinaCountDown is-countdown"
                  data-day={26}
                  data-year={2022}
                >
                  <span className="countdown-row countdown-show4">
                    <span className="countdown-section">
                      <span className="countdown-amount">1</span>
                      <span className="countdown-period">Day</span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount">23</span>
                      <span className="countdown-period">Hrs</span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount">59</span>
                      <span className="countdown-period">Mins</span>
                    </span>
                    <span className="countdown-section">
                      <span className="countdown-amount">19</span>
                      <span className="countdown-period">Secs</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="dealProductImage">
              <img src="/assets/images/home1/7.png" alt="Ulima Fashionable Jeans" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSaleTime

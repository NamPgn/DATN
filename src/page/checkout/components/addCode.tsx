import React from "react";

const AddCode = () => {
  return (
    <form action="">
      <div className="shippingCoupons">
        <h3>Coupon Code</h3>
        <div className="couponFormWrap clearfix">
          <input
            type="text"
            name="coupon_code"
            className="input-text"
            id="coupon_code"
            defaultValue=""
            placeholder="Write your Coupon Code"
          />
          <div className="ulinaBTN"  >
            <span>Apply Code</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCode;

import React from "react";

const AddCode = () => {
  return (
    <form action="">
      <div className="shippingCoupons">
        <h3>Mã giảm giá</h3>
        <div className="couponFormWrap clearfix">
          <input
            type="text"
            name="coupon_code"
            className="input-text"
            id="coupon_code"
            defaultValue=""
            placeholder="Mã giảm giá"
          />
          <div className="ulinaBTN" style={{ cursor:'pointer' }}>
            <span>Sử dụng</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCode;

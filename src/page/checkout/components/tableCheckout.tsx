const TableCheckout = ({
  checkoutItems,
  discount_amount,
  totalAmount,
  handleValidate,
  register,
  errors,
  optionsShip,
  loadingPayment,
  voucher,
  fn_amount,
}: any) => {
  return (
    <div className="orderReviewWrap">
      <h3>Đơn hàng của bạn</h3>
      <div className="orderReview">
        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {checkoutItems.map((item: any) => (
              <tr key={item.id}>
                <td>
                  <a href="javascript:void(0);">{item.name}</a> x{" "}
                  {item.quantity}
                </td>
                <td>
                  <div className="pi01Price">
                    <ins>
                      {(item?.sale_price
                        ? item?.sale_price
                        : item?.regular_price
                      )?.toLocaleString("vi-VN")}
                      ₫
                    </ins>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Tạm tính</th>
              <td>
                <div className="pi01Price">
                  <ins>{totalAmount?.toLocaleString("vi-VN")}₫</ins>
                </div>
              </td>
            </tr>
            <tr className="shippingRow">
              <th>Phí vận chuyển (Cố định)</th>
              <td>
                <div className="pi01Price">
                  <ins>
                    {optionsShip?.fee
                      ? optionsShip?.fee?.toLocaleString("vi-VN") + "đ"
                      : "Vui lòng chọn địa chỉ"}
                  </ins>
                </div>
              </td>
            </tr>

            <tr className="shippingRow">
              <th>Ngày nhận hàng dự kiến</th>
              <td>
                <div className="pi01Price">
                  <ins>
                    {optionsShip?.time
                      ? "Từ ngày " +
                        optionsShip?.time?.from_estimate_date +
                        " - " +
                        optionsShip?.time?.to_estimate_date
                      : "Vui lòng chọn địa chỉ"}
                  </ins>
                </div>
              </td>
            </tr>
            <tr className="shippingRow">
              <th>Giảm giá</th>
              <td>
                <div className="pi01Price">
                  <ins>
                    {voucher?.discount
                      ? voucher?.discount
                      : "Vui lòng chọn mã giảm giá"}
                  </ins>
                </div>
              </td>
            </tr>
            <tr>
              <th>Tổng cộng</th>
              <td>
                <div className="pi01Price">
                  <ins>
                    {(
                      (fn_amount && !isNaN(fn_amount)
                        ? fn_amount
                        : totalAmount) +
                      (optionsShip?.fee && !isNaN(optionsShip.fee)
                        ? optionsShip.fee
                        : 0)
                    ).toLocaleString("vi-VN")}
                    ₫
                  </ins>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Phương thức thanh toán */}
        <ul className="wc_payment_methods">
          <li>
            <input
              type="radio"
              value="vnpay"
              {...register("payment_method")}
              id="paymentMethod01"
            />
            <label htmlFor="paymentMethod01">Chuyển khoản VNPAY</label>
          </li>

          <li>
            <input
              type="radio"
              value="ship_cod"
              {...register("payment_method")}
              id="paymentMethod02"
            />
            <label htmlFor="paymentMethod02">Thanh toán khi nhận hàng</label>
          </li>
          {errors.payment_method && (
            <p className="text-danger">{errors.payment_method.message}</p>
          )}
        </ul>

        <button
          disabled={loadingPayment}
          type="submit"
          className="placeOrderBTN ulinaBTN"
        >
          <span onClick={() => handleValidate()}>
            {" "}
            {loadingPayment ? "Đang xử lý..." : "Thanh toán"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TableCheckout;

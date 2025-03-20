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
                      )?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
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
                      ? voucher?.discount.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })
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
                      (isNaN(fn_amount) ? totalAmount : fn_amount) +
                      (isNaN(optionsShip?.fee) ? 0 : optionsShip?.fee)
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
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

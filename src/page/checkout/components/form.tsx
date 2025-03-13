const CheckoutForm = ({
  register,
  errors,
  openDropdown,
  selectedValues,
  handleClickOption,
  optionsSelectProvince,
  handleChange,
  errorsState,
  optionsDistrict,
  optionsWard,
}: any) => {
  return (
    <div className="col-lg-6">
      <div className="checkoutForm">
        <h3>Địa chỉ thanh toán của bạn</h3>
        <div className="row">
          <>
            <div className="col-md-6">
              <input
                {...register("o_name")}
                placeholder="Họ và tên *"
                type="text"
              />
              {errors.o_name && (
                <p className={"text-danger mx-2"}>{errors.o_name.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                {...register("o_mail")}
                placeholder="Email address *"
              />
              {errors.o_mail && (
                <p className={"text-danger mx-2"}>{errors.o_mail.message}</p>
              )}
            </div>
            <div className="col-md-12">
              <input
                type="text"
                {...register("o_phone")}
                placeholder="Số điện thoại *"
              />
              {errors.o_phone && (
                <p className={"text-danger mx-2"}>{errors.o_phone.message}</p>
              )}
            </div>
          </>

          <div className="col-lg-12">
            <div
              className={`nice-select ${openDropdown.select1 ? "open" : ""}`}
              onClick={() => handleClickOption("select1")}
            >
              <span className="current">
                {selectedValues.select1?.label || "Chọn tỉnh/thành phố"}
              </span>
              <ul className="list">
                {optionsSelectProvince.map((option: any) => (
                  <li
                    key={option.value}
                    className="option"
                    onClick={() => handleChange("select1", option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
            {errorsState.select1 && (
              <p className="text-danger">{errorsState.select1}</p>
            )}
          </div>

          {/* Select quận/huyện */}
          <div className="col-lg-12">
            <div
              className={`nice-select ${openDropdown.select2 ? "open" : ""}`}
              style={{ position: "relative" }}
              onClick={() => handleClickOption("select2")}
            >
              <span className="current">
                {selectedValues.select2?.label || "Chọn quận/huyện"}
              </span>
              <ul className="list ">
                {optionsDistrict.map((option: any) => (
                  <li
                    key={option.value}
                    className="option"
                    onClick={() => handleChange("select2", option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
              {errorsState.select2 && (
                <p
                  style={{ position: "absolute", left: 0 }}
                  className="text-danger z-99 absolute left-0"
                >
                  {errorsState.select2}
                </p>
              )}
            </div>
          </div>

          {/* Select phường/xã */}
          <div
            className="col-lg-12"
            style={{ marginTop: `${errorsState.select2 && "30px"}` }}
          >
            <div
              className={`nice-select ${openDropdown.select3 ? "open" : ""}`}
              onClick={() => handleClickOption("select3")}
            >
              <span className="current">
                {selectedValues.select3?.label || "Chọn phường/xã"}
              </span>
              <ul className="list">
                {optionsWard.map((option: any) => (
                  <li
                    key={option.value}
                    className="option"
                    onClick={() => handleChange("select3", option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
            {errorsState.select3 && (
              <p className="text-danger">{errorsState.select3}</p>
            )}
          </div>
          <div className="col-lg-12">
            <input
              type="text"
              {...register("address")}
              placeholder="Địa chỉ *"
            />
            {errors.address && (
              <p className={"text-danger mx-2"}>{errors.address.message}</p>
            )}
          </div>
          <div className="col-lg-12">
            <textarea
              {...register("note")}
              placeholder="Ghi chú đơn hàng"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

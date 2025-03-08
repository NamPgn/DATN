import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getApiOrderAdress,
  postApiOrderDistrict,
  postApiOrderWard,
} from "../../sevices/orders";
import { toast } from "react-toastify";

const Checkout = () => {
  const [selectedValues, setSelectedValues] = useState<any>({
    select1: { value: null, label: "" },
    select2: { value: null, label: "" },
    select3: { value: null, label: "" },
  });
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const [optionsShip, setOptionsShip]: any = useState({});
  const [openOption, setopenOption] = useState(false);
  const handleClickOption = () => {
    setopenOption((open) => !open);
  };

  const { data: orderGetProvince, isLoading } = useQuery(
    ["orderGetAdress"],
    async () => await getApiOrderAdress()
  );

  const { mutate: MutateDistrict, isLoading: loadingDistrict } = useMutation({
    mutationFn: async (data: any) => {
      return (await postApiOrderDistrict(data)).data;
    },
    onSuccess: (data) => {
      setOptionsDistrict(
        data?.data?.map((item: any) => ({
          key: `district-${item.DistrictID}`,
          label: item.DistrictName,
          value: item.DistrictID,
        })) || []
      );
      setOptionsWard([]);
    },
    onError: () => {
      toast.error("Lỗi tải danh sách quận");
    },
  });

  const { mutate: MutateWard, isLoading: loadingWard } = useMutation({
    mutationFn: async (data: any) => {
      return (await postApiOrderWard(data)).data;
    },
    onSuccess: (data) => {
      console.log(data);
      setOptionsWard(
        data?.data?.map((item: any) => ({
          key: `ward-${item.WardCode}`,
          label: item.WardName,
          value: item.WardCode,
        })) || []
      );
      //   toast.success("Tải danh sách phường thành công");
    },
    onError: () => {
      toast.error("Lỗi tải danh sách phường");
    },
  });
  const optionsSelectProvince =
    orderGetProvince?.data?.data?.map((item: any) => ({
      label: item.ProvinceName,
      value: item.ProvinceID,
    })) || [];
  const handleChange = (key: "select1" | "select2" | "select3", value: any) => {
    let selectedOption: any = {};

    if (key === "select1") {
      selectedOption = optionsSelectProvince.find(
        (opt: any) => opt.value === value
      );
      setSelectedValues({
        select1: selectedOption,
        select2: null,
        select3: null,
      });
      MutateDistrict({ province_id: value });
    } else if (key === "select2") {
      selectedOption = optionsDistrict.find((opt: any) => opt.value === value);
      setSelectedValues((prev: any) => ({
        ...prev,
        select2: selectedOption,
        select3: null,
      }));
      MutateWard({ district_id: value });
    } else if (key === "select3") {
      selectedOption = optionsWard.find((opt: any) => opt.value === value);
      setSelectedValues((prev: any) => ({
        ...prev,
        select3: selectedOption,
      }));
      setSelectedValues((prev: any) => ({ ...prev, select3: null }));
      // MutateShipping({
      //   to_district_id: selectedValues.select2.value,
      //   to_ward_code: selectedOption.value,
      // });
    }
  };
  return (
    <section className="checkoutPage">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="loginLinks">
              <p>
                Already have an account?{" "}
                <a href="javascript:void(0);">Click Here to Login</a>
              </p>
            </div>
            <div className="checkoutForm">
              <h3>Your Billing Address</h3>
              <div className="row">
                <div className="col-md-6">
                  <input type="text" name="field1" placeholder="First Name *" />
                </div>
                <div className="col-md-6">
                  <input type="text" name="field2" placeholder="Last Name *" />
                </div>
                <div className="col-lg-12">
                  <input type="text" name="field3" placeholder="Company Name" />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="field4"
                    placeholder="Email address *"
                  />
                </div>
                <div className="col-md-6">
                  <input type="text" name="field5" placeholder="Phone *" />
                </div>
                <div className="col-lg-12">
                  <div
                    className={`nice-select ${openOption ? "open" : ""}`}
                    onClick={handleClickOption}
                  >
                    <span className="current">
                      {selectedValues.select1?.label || "Chọn tỉnh/thành phố"}
                    </span>
                    <ul className="list">
                      {optionsSelectProvince.map((option: any) => (
                        <li
                          key={option.value}
                          data-value={option.value}
                          className="option"
                          onClick={() => handleChange("select1", option.value)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select quận/huyện */}
                <div className="col-lg-12">
                  <div
                    className={`nice-select ${openOption ? "open" : ""}`}
                    onClick={handleClickOption}
                  >
                    <span className="current">
                      {selectedValues.select2?.label || "Chọn quận/huyện"}
                    </span>
                    <ul className="list">
                      {optionsDistrict.map((option: any) => (
                        <li
                          key={option.value}
                          data-value={option.value}
                          className="option"
                          onClick={() => handleChange("select2", option.value)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select phường/xã */}
                <div className="col-lg-12">
                  <div
                    className={`nice-select ${openOption ? "open" : ""}`}
                    onClick={handleClickOption}
                  >
                    <span className="current">
                      {selectedValues.select3?.label || "Chọn phường/xã"}
                    </span>
                    <ul className="list">
                      {optionsWard.map((option: any) => (
                        <li
                          key={option.value}
                          data-value={option.value}
                          className="option"
                          onClick={() => handleChange("select3", option.value)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <input type="text" name="field7" placeholder="Address *" />
                </div>
                <div className="col-lg-12">
                  <input type="text" name="field8" placeholder="City/Town *" />
                </div>
                <div className="col-md-6">
                  <input type="text" name="field9" placeholder="State *" />
                </div>
                <div className="col-md-6">
                  <input type="text" name="field10" placeholder="Zip Code *" />
                </div>
                <div className="col-lg-12">
                  <div className="checkoutRegister">
                    <input
                      type="checkbox"
                      defaultValue={1}
                      name="field11"
                      id="is_register"
                    />
                    <label htmlFor="is_register">Create Account?</label>
                  </div>
                  <div className="checkoutPassword">
                    <p>
                      Mod tempor incididunt ut labore et dolore magna aliq mpor
                      incididunt ut labore et dolore magna aliqu ostrud
                      exercitation ullamco
                    </p>
                    <input
                      type="password"
                      name="field12"
                      placeholder="Account Password *"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="shippingAddress">
                    <input
                      type="checkbox"
                      defaultValue={1}
                      name="field13"
                      id="shipDifferentAddress"
                    />
                    <label htmlFor="shipDifferentAddress">
                      Ship to Different Address ?
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <textarea
                    name="field14"
                    placeholder="Order Note"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
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
                <button
                  type="submit"
                  className="ulinaBTN"
                  name="apply_coupon"
                  value="Apply Code"
                >
                  <span>Apply Code</span>
                </button>
              </div>
            </div>
            <div className="orderReviewWrap">
              <h3>Your Order</h3>
              <div className="orderReview">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="javascript:void(0);">
                          Ulina casual shirt for men
                        </a>
                      </td>
                      <td>
                        <div className="pi01Price">
                          <ins>$99.00</ins>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="javascript:void(0);">Korra UVR sunglass</a>
                      </td>
                      <td>
                        <div className="pi01Price">
                          <ins>$59.00</ins>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="javascript:void(0);">Marjo fashionable bag</a>
                      </td>
                      <td>
                        <div className="pi01Price">
                          <ins>$39.00</ins>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Sub Total</th>
                      <td>
                        <div className="pi01Price">
                          <ins>$183.00</ins>
                        </div>
                      </td>
                    </tr>
                    <tr className="shippingRow">
                      <th>Shipping (Standard)</th>
                      <td>
                        <div className="pi01Price">
                          <ins>$20.00</ins>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>
                        <div className="pi01Price">
                          <ins>$203.00</ins>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <ul className="wc_payment_methods">
                  <li className="active">
                    <input
                      type="radio"
                      defaultValue={1}
                      name="paymentMethod"
                      id="paymentMethod01"
                    />
                    <label htmlFor="paymentMethod01">
                      Direct bank transfer
                    </label>
                    <div className="paymentDesc shows">
                      Arkono ridoy venge tumi met, consectetur adipisicing elit,
                      sed do eiusmod tempor incidid gna aliqua.
                    </div>
                  </li>
                  <li>
                    <input
                      type="radio"
                      defaultValue={4}
                      name="paymentMethod"
                      id="paymentMethod04"
                    />
                    <label htmlFor="paymentMethod04">Payment by cheque</label>
                    <div className="paymentDesc">
                      Arkono ridoy venge tumi met, consectetur adipisicing elit,
                      sed do eiusmod tempor incidid gna aliqua.
                    </div>
                  </li>
                  <li>
                    <input
                      type="radio"
                      defaultValue={2}
                      name="paymentMethod"
                      id="paymentMethod02"
                    />
                    <label htmlFor="paymentMethod02">Cash on delivery</label>
                    <div className="paymentDesc">
                      Arkono ridoy venge tumi met, consectetur adipisicing elit,
                      sed do eiusmod tempor incidid gna aliqua.
                    </div>
                  </li>
                  <li>
                    <input
                      type="radio"
                      defaultValue={3}
                      name="paymentMethod"
                      id="paymentMethod03"
                    />
                    <label htmlFor="paymentMethod03">Paypal</label>
                    <div className="paymentDesc">
                      Arkono ridoy venge tumi met, consectetur adipisicing elit,
                      sed do eiusmod tempor incidid gna aliqua.
                    </div>
                  </li>
                </ul>
                <button type="button" className="placeOrderBTN ulinaBTN">
                  <span>Place Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getApiOrderAdress,
  postApiOrderDistrict,
  postApiOrderWard,
} from "../../sevices/orders";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AddCode from "./components/addCode";
const schema = z.object({
  firstName: z.string().min(1, "Vui lòng nhập Họ."),
  lastName: z.string().min(1, "Vui lòng nhập Tên."),
  email: z.string().email("Email không hợp lệ."),
  phone: z.string().min(1, "Vui lòng nhập số điện thoại."),
  address: z.string().min(1, "Vui lòng nhập Địa chỉ."),
  city: z.string().min(1, "Vui lòng nhập Thành phố."),
  zipCode: z.string().min(1, "Vui lòng nhập Mã bưu điện."),
  orderNote: z.string().optional(),
});
const Checkout = () => {
  const [selectedValues, setSelectedValues] = useState<any>({
    select1: { value: null, label: "" },
    select2: { value: null, label: "" },
    select3: { value: null, label: "" },
  });
  const [openDropdown, setOpenDropdown] = useState({
    select1: false,
    select2: false,
    select3: false,
  });
  const [errorsState, setErrorsState] = useState({
    select1: "",
    select2: "",
    select3: "",
  });
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleClickOption = (key: "select1" | "select2" | "select3") => {
    setOpenDropdown((prev) => ({
      select1: false,
      select2: false,
      select3: false,
      [key]: !prev[key], // Chỉ mở dropdown đang click
    }));
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
    setSelectedValues((prev: any) => {
      let updatedValues = { ...prev };

      if (key === "select1") {
        const selectedOption = optionsSelectProvince.find(
          (opt: any) => opt.value === value
        );
        updatedValues = {
          select1: selectedOption,
          select2: { value: null, label: "" },
          select3: { value: null, label: "" },
        };

        MutateDistrict({ province_id: value });
      } else if (key === "select2") {
        const selectedOption = optionsDistrict.find(
          (opt: any) => opt.value === value
        );
        updatedValues = {
          ...prev,
          select2: selectedOption,
          select3: { value: null, label: "" },
        };

        MutateWard({ district_id: value });
      } else if (key === "select3") {
        const selectedOption = optionsWard.find(
          (opt: any) => opt.value === value
        );
        updatedValues = { ...prev, select3: selectedOption };
      }
      setOpenDropdown({ select1: false, select2: false, select3: false });
      setErrorsState((prevErrors) => ({ ...prevErrors, [key]: "" }));
      return updatedValues;
    });
  };
  const validateForm = () => {
    let newErrors = {
      select1:
        selectedValues.select1 !== "" ? "Vui lòng chọn tỉnh/thành phố." : "",
      select2: selectedValues.select2 !== "" ? "Vui lòng chọn quận/huyện." : "",
      select3: selectedValues.select3 !== "" ? "Vui lòng chọn phường/xã." : "",
    };

    setErrorsState(newErrors);
    console.log(Object.values(newErrors));
    return Object.values(newErrors).every((error) => error === "");
  };
  const onSubmit = (data: any) => {
    console.log("Dữ liệu gửi:", data);
    if (validateForm()) {
      console.log("Dữ liệu hợp lệ:", selectedValues);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="checkoutPage">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="checkoutForm">
                <h3>Your Billing Address</h3>
                <div className="row">
                  <>
                    <div className="col-md-6">
                      <input
                        {...register("firstName")}
                        placeholder="Họ *"
                        type="text"
                      />
                      {errors.firstName && <p>{errors.firstName.message}</p>}
                    </div>
                    <div className="col-md-6">
                      <input
                        {...register("lastName")}
                        placeholder="Tên *"
                        type="text"
                      />
                      {errors.lastName && <p>{errors.lastName.message}</p>}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        {...register("email")}
                        placeholder="Email address *"
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        {...register("phone")}
                        placeholder="Số điện thoại *"
                      />
                      {errors.phone && <p>{errors.phone.message}</p>}
                    </div>
                  </>

                  <div className="col-lg-12">
                    <div
                      className={`nice-select ${
                        openDropdown.select1 ? "open" : ""
                      }`}
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
                            onClick={() =>
                              handleChange("select1", option.value)
                            }
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {errorsState.select1 && (
                      <p className="text-red-500">{errorsState.select1}</p>
                    )}
                  </div>

                  {/* Select quận/huyện */}
                  <div className="col-lg-12">
                    <div
                      className={`nice-select ${
                        openDropdown.select2 ? "open" : ""
                      }`}
                      onClick={() => handleClickOption("select2")}
                    >
                      <span className="current">
                        {selectedValues.select2?.label || "Chọn quận/huyện"}
                      </span>
                      <ul className="list">
                        {optionsDistrict.map((option: any) => (
                          <li
                            key={option.value}
                            className="option"
                            onClick={() =>
                              handleChange("select2", option.value)
                            }
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                      {errorsState.select2 && (
                        <p className="text-red-500">{errorsState.select2}</p>
                      )}
                    </div>
                  </div>

                  {/* Select phường/xã */}
                  <div className="col-lg-12">
                    <div
                      className={`nice-select ${
                        openDropdown.select3 ? "open" : ""
                      }`}
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
                            onClick={() =>
                              handleChange("select3", option.value)
                            }
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {errorsState.select3 && (
                      <p className="text-red-500">{errorsState.select3}</p>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <input type="text" name="field7" placeholder="Address *" />
                  </div>
                  <div className="col-lg-12">
                    <input
                      type="text"
                      {...register("address")}
                      placeholder="Địa chỉ *"
                    />
                    {errors.address && <p>{errors.address.message}</p>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      {...register("city")}
                      placeholder="Thành phố *"
                    />
                    {errors.city && <p>{errors.city.message}</p>}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      {...register("zipCode")}
                      placeholder="Mã bưu điện *"
                    />
                    {errors.zipCode && <p>{errors.zipCode.message}</p>}
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      {...register("orderNote")}
                      placeholder="Ghi chú đơn hàng"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <AddCode />
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
                          <a href="javascript:void(0);">
                            Marjo fashionable bag
                          </a>
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
                        Arkono ridoy venge tumi met, consectetur adipisicing
                        elit, sed do eiusmod tempor incidid gna aliqua.
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
                        Arkono ridoy venge tumi met, consectetur adipisicing
                        elit, sed do eiusmod tempor incidid gna aliqua.
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
                        Arkono ridoy venge tumi met, consectetur adipisicing
                        elit, sed do eiusmod tempor incidid gna aliqua.
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
                        Arkono ridoy venge tumi met, consectetur adipisicing
                        elit, sed do eiusmod tempor incidid gna aliqua.
                      </div>
                    </li>
                  </ul>
                  <button type="submit" className="placeOrderBTN ulinaBTN">
                    <span>Place Order</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Checkout;

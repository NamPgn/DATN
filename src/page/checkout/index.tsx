import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getApiOrderAdress,
  postApiOrderDistrict,
  postApiOrderGetShip,
  postApiOrderWard,
} from "../../sevices/orders";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AddCode from "./components/addCode";
import { useCheckout } from "../../context/checkout";
import CheckoutForm from "./components/form";
import TableCheckout from "./components/tableCheckout";
import { paymentOrder } from "../../sevices/client/orders";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  o_name: z.string().min(1, "Vui lòng nhập Họ và tên"),
  o_mail: z.string().email("Email không hợp lệ."),
  o_phone: z.string().min(1, "Vui lòng nhập số điện thoại."),
  address: z.string().min(1, "Vui lòng nhập Địa chỉ."),
  note: z.string().optional(),
  payment_method: z.enum(["vnpay", "ship_cod"], {
    message: "Vui lòng chọn phương thức thanh toán.",
  }),
});
const Checkout = () => {
  const { checkoutItems } = useCheckout();
  const [optionsShip, setOptionsShip]: any = useState({});
  const [total_amount, settotal_amount]: any = useState(0);
  const [shippingFee, setShippingFee]: any = useState(0);
  const [discountAmount, setDiscountAmount]: any = useState(0);
  const navigate = useNavigate();
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
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const totalAmount = checkoutItems.reduce(
      (sum: number, item: any) =>
        sum + (item.sale_price ? item.sale_price : item.regular_price || 0) * item.quantity,
      0
    );
    settotal_amount(totalAmount);
  }, [checkoutItems]);

  const { mutate: MutateShipping } = useMutation({
    mutationFn: async (data: any) => {
      return (await postApiOrderGetShip(data)).data;
    },
    onSuccess: (data) => {
      setOptionsShip(data);
    },
    onError: () => {
      toast.error("Lỗi tải danh sách giao hàng");
    },
  });
  const handleClickOption = (key: "select1" | "select2" | "select3") => {
    setOpenDropdown((prev) => ({
      select1: false,
      select2: false,
      select3: false,
      [key]: !prev[key],
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
  const { mutate: payment, isLoading: loadingPayment } = useMutation({
    mutationFn: async (data: any) => {
      return await paymentOrder(data);
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
        const selectedOption: any = optionsWard.find(
          (opt: any) => opt.value === value
        );
        updatedValues = { ...prev, select3: selectedOption };
        MutateShipping({
          to_district_id: selectedValues.select2.value,
          to_ward_code: selectedOption?.value,
          weight: checkoutItems.reduce(
            (sum: number, item: any) => sum + item.weight * item.quantity,
            0
          ),
        });
      }

      setOpenDropdown({ select1: false, select2: false, select3: false });
      setErrorsState((prevErrors) => ({ ...prevErrors, [key]: "" }));
      return updatedValues;
    });
  };
  const validateForm = () => {
    let newErrors = {
      select1:
        selectedValues.select1?.value === null
          ? "Vui lòng chọn tỉnh/thành phố."
          : "",
      select2:
        selectedValues.select2?.value === null
          ? "Vui lòng chọn quận/huyện."
          : "",
      select3:
        selectedValues.select3?.value === null
          ? "Vui lòng chọn phường/xã."
          : "",
    };
    setErrorsState(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };
  const handleValidate = () => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }
  };
  const onSubmit = async (values: any) => {
    const discount = 0;

    setShippingFee(optionsShip.fee);
    setDiscountAmount(0);
    //final tổng tiền + phí ship - discount

    console.log(total_amount + optionsShip.fee - discount)
    const data = {
      ...values,
      o_address:
        values.address +
        "," +
        ` ${selectedValues.select3.label}, ${selectedValues.select2.label}, ${selectedValues.select1.label}`,
      discount_amount: 0,
      final_amount: total_amount + optionsShip.fee - discount,
      products: checkoutItems,
      shipping: optionsShip.fee,
      time: optionsShip.time,
      total_amount: total_amount,
    };
    payment(data, {
      onSuccess: (order: any) => {
        if (values.payment_method === "vnpay") {
          window.location.href = order?.data?.url;
        } else {
          toast.success(order?.data?.message);
          navigate("/o/thanks");
        }
      },
      onError: () => {
        toast.error("Thanh toán thất bại!");
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="checkoutPage">
        <div className="container">
          <div className="row">
            <CheckoutForm
              register={register}
              errors={errors}
              openDropdown={openDropdown}
              selectedValues={selectedValues}
              handleClickOption={handleClickOption}
              optionsSelectProvince={optionsSelectProvince}
              handleChange={handleChange}
              errorsState={errorsState}
              optionsDistrict={optionsDistrict}
              optionsWard={optionsWard}
            />
            <div className="col-lg-6">
              <AddCode />
              <TableCheckout
                register={register}
                errors={errors}
                checkoutItems={checkoutItems}
                discount_amount={discountAmount}
                shippingFee={shippingFee}
                totalAmount={total_amount}
                handleValidate={handleValidate}
                optionsShip={optionsShip}
                loadingPayment={loadingPayment}
              />
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Checkout;

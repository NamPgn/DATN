/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { applyVoucher } from "../../../sevices/client/voucher";
import { toast } from "react-toastify";
import { useState } from "react";

const AddCode = ({ setDataVoucher, total_amount, setVoucherCode }: any) => {
  const [voucher, setVoucher] = useState<any | null>(null);

  const { mutate: apply, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      return await applyVoucher(data);
    },
    onSuccess: (data) => {
      setDataVoucher(data?.data);
    },
    onError({ response }: any) {
      toast.error(response?.data?.message);
    },
  });

  const handleApplyVoucher = async () => {
    if (voucher !== "") {
      const data = {
        voucher_code: voucher,
        total_amount: total_amount,
      };
      apply(data);
    }
  };
  return (
    <form>
      <div className="shippingCoupons">
        <h3>Mã giảm giá</h3>
        <div className="couponFormWrap clearfix">
          <input
            type="text"
            className="input-text"
            id="coupon_code"
            placeholder="Mã giảm giá"
            onChange={(e) => {
              setVoucher(e.target.value);
              setVoucherCode(e.target.value);
            }}
          />
          <button
            onClick={handleApplyVoucher}
            type="button"
            className="ulinaBTN"
            style={{ cursor: "pointer" }}
          >
            <span>{isLoading ? "..." : "Sử dụng"}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCode;

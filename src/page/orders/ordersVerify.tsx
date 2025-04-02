import { useMutation } from "react-query";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { verifyOrder, verifyOrderOtp } from "../../sevices/client/orders";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { token_auth } from "../../common/auth/getToken";
import { useNavigate } from "react-router-dom";

const OrdersVerify = ({ orderResponse }: any) => {
  const [otp, setOtp] = useState<string | null>(null);
  const nav = useNavigate();
  const emailSchema = z.object({
    email: z.string().email("Email không hợp lệ").min(1, "Vui lòng nhập email"),
  });

  const otpSchema = z.object({
    otp: z.string().min(1, "Vui lòng nhập mã OTP"),
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const { mutate: sendOtp, isLoading: loadingEmail } = useMutation({
    mutationFn: async (val) => await verifyOrder(val),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
      setOtp(data?.data?.code);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const { mutate: verifyOtp, isLoading: loadingOtp } = useMutation({
    mutationFn: async (val) => await verifyOrderOtp(val),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
      localStorage.setItem("tokenOtp", JSON.stringify(data?.data?.token));
      nav("/order/detail/" + orderResponse?.order_code);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return (
    <TailwindComponent>
      <div
        className="max-w-md mx-auto bg-white rounded-lg p-5 border "
        style={{ marginTop: "200px", marginBottom: "100px" }}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Thông tin đơn hàng
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Mã đơn hàng:</span>
            <span className="text-gray-900">{orderResponse?.order_code}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Trạng thái:</span>
            <span className="text-blue-500">{orderResponse?.status?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Thanh toán:</span>
            <span className="text-red-500">
              {orderResponse?.payment_status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Vận chuyển:</span>
            <span className="text-yellow-500">
              {orderResponse?.shipping_status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Xác thực:</span>
            <span
              className={`font-semibold ${
                orderResponse?.is_verified ? "text-green-500" : "text-red-500"
              }`}
            >
              {orderResponse?.is_verified ? "Đã xác thực" : "Chưa xác thực"}
            </span>
          </div>

          {!otp && (
            <form
              onSubmit={handleSubmitEmail((data: any) => {
                sendOtp({ ...data, order_code: orderResponse?.order_code });
              })}
              className="space-y-3"
            >
              <div className="my-3">
                <input
                  type="text"
                  {...registerEmail("email")}
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errorsEmail.email && (
                  <p className="text-red-500 text-sm">
                    {errorsEmail.email.message}
                  </p>
                )}
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg text-sm hover:bg-blue-700 transition duration-300 w-full"
                type="submit"
              >
                {loadingEmail ? "Chờ..." : "Gửi mã OTP"}
              </button>
            </form>
          )}

          {otp && (
            <form
              onSubmit={handleSubmitOtp((data: any) => {
                verifyOtp({ ...data, order_code: orderResponse?.order_code });
              })}
              className="space-y-3"
            >
              <div className="my-3">
                <input
                  type="text"
                  {...registerOtp("otp")}
                  placeholder="Mã xác thực"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errorsOtp.otp && (
                  <p className="text-red-500 text-sm">
                    {errorsOtp.otp.message}
                  </p>
                )}
              </div>
              <button
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg text-sm hover:bg-green-700 transition duration-300 w-full"
                type="submit"
              >
                {loadingOtp ? "Chờ..." : "Xác thực OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </TailwindComponent>
  );
};

export default OrdersVerify;

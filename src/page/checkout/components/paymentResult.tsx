import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "react-query";
import { paymentReusult } from "../../../sevices/client/orders";
import TailwindComponent from "../../../components/Tailwind/TailwinComponent";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<
    "loading" | "success" | "failed"
  >("loading");

  const isSuccessFromBank = queryParams.get("vnp_ResponseCode") === "00";
  const queryString = location.search.substring(1);

  useEffect(() => {
    if (!isSuccessFromBank) {
      setPaymentStatus("failed");
    }
  }, [isSuccessFromBank]);

  const { data: orderResult, isLoading }: any = useQuery({
    queryFn: async () => await paymentReusult(queryString),
    enabled: isSuccessFromBank,
  });

  useEffect(() => {
    if (orderResult) {
      setPaymentStatus(orderResult.success ? "success" : "failed");
    }
  }, [orderResult]);

  return (
    <TailwindComponent>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm">
          {paymentStatus === "loading" ? (
            <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16 mx-auto"></div>
          ) : paymentStatus === "success" ? (
            <AiOutlineCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          ) : (
            <AiOutlineCloseCircle className="w-16 h-16 text-red-500 mx-auto" />
          )}

          <h1
            className={`mt-4 text-2xl font-bold ${
              paymentStatus === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {paymentStatus === "loading"
              ? "Đang xử lý..."
              : paymentStatus === "success"
              ? "Thanh toán thành công!"
              : "Thanh toán thất bại!"}
          </h1>

          <p className="mt-2 text-gray-600">
            {paymentStatus === "loading"
              ? "Vui lòng chờ hệ thống xác nhận..."
              : paymentStatus === "success"
              ? "Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý."
              : "Thanh toán không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ."}
          </p>

          <div className="mt-6 flex space-x-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Về trang chủ
            </button>
            {paymentStatus === "success" && (
              <button
                onClick={() => navigate("/o/order-history")}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Xem đơn hàng
              </button>
            )}
          </div>
        </div>
      </div>
    </TailwindComponent>
  );
};

export default PaymentResult;

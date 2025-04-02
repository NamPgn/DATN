import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { useQuery } from "react-query";
import { getOrderCodeUser } from "../../sevices/client/orders";
import { useNavigate } from "react-router-dom";
import OrdersVerify from "./ordersVerify";
import { toast } from "react-toastify";

const TrackingOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [orderData, setOrderData] = useState(null);
  const redirect = useNavigate();
  const { isLoading }: any = useQuery({
    queryKey: ["orderCode", orderCode],
    queryFn: async () => {
      return (await getOrderCodeUser(orderCode)).data?.data || null;
    },
    onSuccess: (data) => {
      if (data?.is_verified) {
        redirect("/order/detail/" + data?.order_code);
      } else {
        setOrderData(data);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    enabled: !!orderCode,
    staleTime: Infinity,
  });
  const handleSearch = () => {
    setOrderCode(orderId);
  };

  return (
    <TailwindComponent>
      {orderData ? (
        <OrdersVerify orderResponse={orderData} />
      ) : (
        <div className="max-w-4xl mx-auto p-6" style={{ minHeight: "100vh" }}>
          <h2 className="text-xl font-bold mb-4">Tìm kiếm đơn hàng</h2>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Nhập mã đơn hàng"
              className="w-full p-2 border rounded"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button
              className="p-2 bg-blue-600 text-white rounded flex items-center gap-1"
              onClick={handleSearch}
              style={{ width: "20%" }}
            >
              <SearchOutlined className="w-5 h-5" />{" "}
              {isLoading ? "Đang chờ..." : "Tìm kiếm"}
            </button>
          </div>
        </div>
      )}
    </TailwindComponent>
  );
};

export default TrackingOrder;

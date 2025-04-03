import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { useQuery } from "react-query";
import { getOrderCodeUser } from "../../sevices/client/orders";
import { useLocation, useNavigate } from "react-router-dom";
import OrdersVerify from "./ordersVerify";
import { toast } from "react-toastify";

const TrackingOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [orderData, setOrderData] = useState(null);
  const location = useLocation();
  const redirect = useNavigate();
  const [searchKey, setSearchKey] = useState(0);

  const { isLoading }: any = useQuery({
    queryKey: ["orderCode", orderCode, searchKey],
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
  });

  useEffect(() => {
    setOrderCode("");
    setOrderData(null);
    setOrderId("");
  }, [location.key]);
  
  const handleSearch = () => {
    if (!orderId) return toast.warning("Vui lòng nhập mã đơn hàng");
    setOrderCode(orderId);
    setSearchKey(prev => prev + 1); 
    setOrderData(null);
  };

  return (
    <TailwindComponent>
      {orderData ? (
        <OrdersVerify orderResponse={orderData} setOrderData={setOrderData} />
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
              <SearchOutlined className="w-5 h-5" /> {isLoading ? "Đang chờ..." : "Tìm kiếm"}
            </button>
          </div>
        </div>
      )}
    </TailwindComponent>
  );
};

export default TrackingOrder;
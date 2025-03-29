import { useMutation, useQuery } from "react-query";
import {
  closeOrderUser,
  getOrderCodeUser,
  payOrderUser,
} from "../../sevices/client/orders";
import { useNavigate, useParams } from "react-router-dom";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { useState } from "react";
import ModalConfirm from "./modalConfirm";
import ModalConfirmCancel from "./modalConfirmCancle";
import { ACTIONS_INDEX, SHIPPING_ICONS, STATUSICONS } from "../../constant";
import { toast } from "react-toastify";
import ReturnModal from "./modalConfirmReturn";

const OrderDetailUser = () => {
  const { code } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCancle, setIsModalCancle] = useState(false);
  const [isModalOpenturn, setIsModalReturn] = useState(false);
  const nav = useNavigate();
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orderCode", code],
    queryFn: async () => {
      return (await getOrderCodeUser(code)).data?.data || null;
    },
  });

  const { mutate, isLoading: loadingRePay } = useMutation({
    mutationFn: async () => {
      return await payOrderUser({
        code: order?.order_code,
      });
    },
    onSuccess: (data: any) => {
      window.location.href = data?.data?.url;
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const { mutate: close, isLoading: loadingClose } = useMutation({
    mutationFn: async () => {
      return await closeOrderUser({
        code: order?.order_code,
      });
    },
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Đang tải...</div>;
  }

  if (!order) {
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy đơn hàng
      </div>
    );
  }
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDateTime = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleAction = (action: string) => {
    const actionData = ACTIONS_INDEX[action];
    switch (actionData?.action) {
      case "return":
        setIsModalReturn(true);
        break;
      case "cancel":
        setIsModalCancle(true);
        break;
      case "pay":
        mutate();
        break;
      case "close":
        close();
        break;
      default:
        break;
    }
  };
  return (
    <TailwindComponent>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Chi tiết đơn hàng
              </h2>
              <p className="text-sm text-gray-500">
                Mã đơn: {order.order_code}
              </p>
            </div>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              {order?.status?.name}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4">
            {/* Sản phẩm */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Sản phẩm</h3>
              {order?.items.map((item: any, index: any) => (
                <div key={index} className="flex items-center mb-4 space-x-4">
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {Object.entries(JSON.parse(item.variation))
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                    </p>
                    <p className="text-sm">
                      {item.quantity} x {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Thông tin đơn hàng */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Thông tin đơn hàng</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng tiền sản phẩm:</span>
                  <span>{formatCurrency(order?.total_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span>{formatCurrency(order?.shipping_fee)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Tổng thanh toán:</span>
                  <span>{formatCurrency(order?.final_amount)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái thanh toán:</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {order?.payment_status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái vận chuyển:</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {order?.shipping_status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t">
            <h3 className="font-semibold text-lg mb-4">Thông tin khách hàng</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tên:</p>
                <p>{order?.o_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số điện thoại:</p>
                <p>{order?.o_phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p>{order?.o_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Địa chỉ:</p>
                <p>
                  {order?.o_address
                    .replace(/,\s*,*/g, ",")
                    .replace(/,\s*$/, "")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t">
            <h3 className="font-semibold text-lg mb-4">Lịch sử đơn hàng</h3>
            <div className="relative pl-4 border-l-2 border-gray-200">
              {order?.status_timelines.map((timeline: any, index: any) => (
                <div
                  key={index}
                  className="relative mb-4 pl-6 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="absolute left-[13px] top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {STATUSICONS[timeline.to] || "📦"}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className="font-medium text-gray-800 "
                        style={{ marginLeft: "30px" }}
                      >
                        {timeline.from ? `Từ ${timeline.from}` : "Tạo mới"}
                        {" → "}
                        <span className="text-blue-600">{timeline.to}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(timeline.changed_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {order?.shipping_logs && order?.shipping_logs.length > 0 && (
            <div className="p-4 bg-white border-t">
              <h3 className="font-semibold text-lg mb-4">
                Thông tin vận chuyển
              </h3>
              <div className="relative pl-4 border-l-2 border-gray-200">
                {order?.shipping_logs.map((log: any, index: any) => (
                  <div
                    key={index}
                    className="relative mb-4 pl-6 pb-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                      {SHIPPING_ICONS[log.status] || "🚚"}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">
                          <span className="text-green-600">{log.status}</span>
                        </p>
                        {log.note && (
                          <p className="text-sm text-gray-600 mt-1">
                            Ghi chú: {log.note}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDateTime(log.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order?.actions && order?.actions.length > 0 && (
            <div className="p-4 border-t flex space-x-3">
              {order.actions.map((action: any) => {
                const actionData = ACTIONS_INDEX[action] || {
                  label: action,
                  color: "bg-gray-200 text-gray-700 hover:bg-gray-300",
                };
                return (
                  <button
                    key={action}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${actionData.color}`}
                    onClick={() => handleAction(action)}
                  >
                    {action === "pay" && loadingRePay
                      ? "Chờ..."
                      : action === "close" && loadingClose
                      ? "Chờ..."
                      : actionData.label}
                  </button>
                );
              })}
            </div>
          )}

          {isModalOpen && (
            <ModalConfirm
              setIsModalOpen={setIsModalOpen}
              actionIndex={ACTIONS_INDEX}
            />
          )}

          {isModalOpenCancle && (
            <ModalConfirmCancel
              refetch={refetch}
              setIsModalOpen={setIsModalCancle}
              order={order}
              nav={nav}
            />
          )}

          {isModalOpenturn && (
            <ReturnModal order={order} setIsModalReturn={setIsModalReturn} />
          )}
        </div>
      </div>
    </TailwindComponent>
  );
};

export default OrderDetailUser;

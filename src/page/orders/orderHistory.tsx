import React, { useState } from "react";
import axios from "axios";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import {
  getOrderPaymentUser,
  getOrderStatusUser,
} from "../../sevices/client/orders";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const OrderHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const token = localStorage.getItem("access_token");
  const [currentPage, setCurrentPage] = useState<any | number>(1);
  const { data: orderStatus } = useQuery({
    queryKey: ["orderStatus"],
    queryFn: async () => {
      return (await getOrderStatusUser()).data?.data || [];
    },
  });
  const { data: orderPayment, isLoading: loadingPayment } = useQuery({
    queryKey: ["orderPayment", activeTab, currentPage],
    queryFn: async () => {
      return (
        (await getOrderPaymentUser(currentPage, activeTab)).data?.data || []
      );
    },
  });

  const getFilteredOrders = (status: string | null) => {
    if (!orderPayment?.orders) return [];

    if (status === null) {
      return orderPayment?.orders;
    }

    return orderPayment?.orders;
  };
  const pagination = orderPayment?.pagination || {};
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (orderPayment?.pagination?.last_page || 1)) {
      setCurrentPage(newPage);
    }
  };

  const handleCancelOrder = async (idOrder: number) => {
    const confirm = window.confirm("Bạn có muốn hủy đơn hàng này không");
    if (confirm) {
      try {
        await axios.patch(
          `http://localhost:8000/api/client/orders/${idOrder}`,
          { status: "Đã hủy" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === idOrder ? { ...order, status: "Đã hủy" } : order
          )
        );
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng:", error);
      }
    }
  };

  const renderOrderCard = (filteredOrders: any[]) => {
    if (loadingPayment) {
      return (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      );
    }
    return filteredOrders?.length > 0 ? (
      filteredOrders.map((order) => (
        <div
          key={order.code}
          className="rounded-lg p-4 mb-4 shadow-sm bg-gray-50"
        >
          <div className="flex text-center justify-between items-center mb-4">
            <div className="font-semibold text-lg">
              Mã đơn hàng: {order.code}
            </div>
            <div>
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status_code === "shipping"
                    ? "bg-yellow-200 text-yellow-700"
                    : order.status_code === "completed"
                    ? "bg-green-200 text-green-700"
                    : order.status_code === "cancelled"
                    ? "bg-red-200 text-red-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {order.status}
              </div>
            </div>
          </div>

          <div className="mb-4">
            {order.products.map((item: any, index: number) => (
              <div key={index} className="flex items-center mb-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-gray-500">
                    Màu: {item.variation["Màu sắc"]}, Kích cỡ:{" "}
                    {item.variation["Kích thước"]}
                  </div>
                  <div>Số lượng: {item.quantity}</div>
                  <div className="text-red-600 font-semibold">
                    Giá: {item.price.toLocaleString()}đ
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right font-semibold text-xl text-red-700">
            Tổng giá: {order.final_amount.toLocaleString()}đ
          </div>
          <div className="text-gray-500 text-sm mt-2">
            Ngày tạo: {order.created_at}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            Thanh toán: {order.payment_status}
          </div>
          <div className="flex  gap-3 mt-4 items-center">
            {(order.status_code === "pending" ||
              order.status_code === "confirmed") && (
              <div className=" space-x-2">
                {(order.status_code === "pending" ||
                  order.status_code === "confirmed") && (
                  <button
                    onClick={() => handleCancelOrder(order.code)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Hủy đơn hàng
                  </button>
                )}
              </div>
            )}
            <Link to={"/order/detail/" + order.code}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Chi tiết đơn hàng
              </button>
            </Link>
          </div>
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center rounded-lg p-4 mb-4 shadow-sm bg-gray-50">
        <img
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png"
          alt="No orders"
          className="w-[150px] h-[150px]"
        />
        <div className="text-gray-600 text-lg mt-[10px]">
          Không có đơn hàng nào
        </div>
      </div>
    );
  };

  const filteredOrders = getFilteredOrders(activeTab);
  return (
    <TailwindComponent>
      <div className="p-6">
        <div className="flex space-x-4 mb-4 justify-center">
          {orderStatus
            ?.filter((status: any) => status.label?.trim())
            .map((status: any) => {
              const label = status.label.trim();
              return (
                <button
                  key={status.code}
                  onClick={() => setActiveTab(status.code)}
                  className={`px-6 py-2 rounded-lg transition-all duration-200 shadow-md ${
                    activeTab === status.code
                      ? "bg-red-400 text-white font-semibold scale-105"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {label}
                </button>
              );
            })}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {renderOrderCard(filteredOrders)}
      </div>

      {pagination.last_page && (
        <div className="flex justify-center m-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Trang trước
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded">
            {currentPage} / {pagination.last_page}
          </span>
          <button
            disabled={currentPage === pagination.last_page}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === pagination.last_page
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Trang sau
          </button>
        </div>
      )}
    </TailwindComponent>
  );
};

export default OrderHistory;

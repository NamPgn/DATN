import { useMutation, useQuery } from "react-query";
import {
  closeOrderUser,
  getOrderCodeUser,
  payOrderUser,
} from "../../sevices/client/orders";
import { useNavigate, useParams } from "react-router-dom";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { useEffect, useState } from "react";
import ModalConfirm from "./modalConfirm";
import ModalConfirmCancel from "./modalConfirmCancle";
import { ACTIONS_INDEX, SHIPPING_ICONS, STATUSICONS } from "../../constant";
import { toast } from "react-toastify";
import ReturnModal from "./modalConfirmReturn";
import CountdownTimer from "./countdownTimer";
import { token_auth } from "../../common/auth/getToken";
import ReviewModal from "./modalReview";
const OrderDetailUser = () => {
  const { code } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCancle, setIsModalCancle] = useState(false);
  const [isModalOpenturn, setIsModalReturn] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [reviewItem, setReviewItem] = useState<any>(null);
  const [reviewItemState, setReviewItemState] = useState<any>(null);
  const tokenOtp: any = localStorage.getItem("tokenOtp");
  const tkOtp = JSON.parse(tokenOtp);
  const nav = useNavigate();
  useEffect(() => {
    if (!tkOtp && !token_auth()) {
      //chưa đăng nhập + chưa có otp token thì ko cho vào tracking mà đăng nhập thì ko cho vào
      nav("/o/tracking");
    }
  }, [tkOtp, token_auth]);

  const {
    data: order,
    isLoading,
    refetch,
  }: any = useQuery({
    queryKey: ["orderCode", code],
    queryFn: async () => {
      return (await getOrderCodeUser(code)).data?.data || null;
    },
    onSuccess: (data: any) => {
      if (!data?.is_verified) {
        toast.info("Đơn hàng của bạn chưa được xác thực");
        nav("/o/tracking");
      }
    },
    enabled: !!code,
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

  const handleActionReview = (action: string | { action: string; order_item_id: number }) => {
    if (typeof action === 'object' && 'action' in action) {
      const actionName = action.action;
      if (actionName === 'review') {
        // Find the product item to review
        const item = order.items.find((item: any) => item.id === action.order_item_id);
        if (item) {
          setReviewItem({
            orderItemId: item.id,
            productId: item.product_id,
            productName: item.product_name,
            productImage: item.image
          });
          setIsReviewModalOpen(true);
        }
        return;
      } else if (actionName === 'update_review') {
        const product = order.items.find((item: any) => item.id === action.order_item_id);
        if (product && product.review) {
          setSelectedReview(product.review);
          setIsReviewModalOpen(true);
        }
        return;
      } else {
        const product = order.items.find((item: any) => item.id === action.order_item_id);
        if (product && product.review) {
          setSelectedReview(product.review);
          setIsReviewModalOpen(true);
        }
      }
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
              {order.subtitle && (
                <p className="text-sm text-gray-500 font-bold">
                  {order.subtitle}
                </p>
              )}

              {order?.expiried_at !== null ? (
                <CountdownTimer expiredAt={order?.expiried_at} />
              ) : (
                ""
              )}
            </div>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              {order?.status?.name}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4">
            {/* Sản phẩm */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Sản phẩm</h3>
              {order?.items?.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border-b">
                  <img src={item.image} alt={item.product_name} className="w-20 h-20 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product_name}</h3>
                    <p className="text-gray-500">Số lượng: {item.quantity}</p>
                    <p className="text-gray-500">Giá: {item.price.toLocaleString()}đ</p>
                  </div>
                  <div className="flex gap-2">
                    {order.actions && order.actions.some((action: any) =>
                      typeof action === 'object' &&
                      action.action === 'review' &&
                      action.order_item_id === item.id
                    ) && (
                        <button
                          onClick={() => {
                            const action = order.actions.find((a: any) =>
                              typeof a === 'object' &&
                              a.action === 'review' &&
                              a.order_item_id === item.id
                            );
                            if (action) handleActionReview(action);
                          }}
                          className="px-4 py-2 bg-blue-500 text-sm text-white rounded hover:bg-blue-600"
                        >
                          Đánh giá
                        </button>
                      )}
                    {order.actions && order.actions.some((action: any) =>
                      typeof action === 'object' &&
                      action.action === 'update_review' &&
                      action.order_item_id === item.id
                    ) && (
                        <button
                          onClick={() => {
                            const action = order.actions.find((a: any) =>
                              typeof a === 'object' &&
                              a.action === 'update_review' &&
                              a.order_item_id === item.id
                            );
                            if (action) handleActionReview(action);
                          }}
                          className="px-4 py-2 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                        >
                          Sửa
                        </button>
                      )}
                    {item?.review?.is_updated === true && <button
                      onClick={() => {
                        const action = {
                          action: 'view',
                          order_item_id: item?.review?.order_item_id
                        }
                        setReviewItemState(item?.review)
                        if (action) handleActionReview(action);
                      }}
                      className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                      Xem
                    </button>}
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

          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="bg-gray-50 rounded-lg p-4">
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
                          className="font-medium text-gray-800"
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
              <div className="bg-white rounded-lg p-4 " style={{
                height: "500px",
                overflowY: "scroll",
              }}>
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
                            <span
                              className="text-green-600"
                              style={{ marginLeft: "30px" }}
                            >
                              {log.status}
                            </span>
                          </p>
                          {log?.location && (
                            <p className="font-medium text-gray-800">
                              <span
                                className="text-green-600"
                                style={{ marginLeft: "30px" }}
                              >
                                {log.location}
                              </span>
                            </p>
                          )}
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
          </div>

          {order?.actions && order?.actions.length > 0 && (
            <div className="p-4 border-t flex flex-col space-y-4">
              <div className="flex space-x-3">
                {order.actions.map((action: any) => {
                  if (typeof action === 'object') return null;

                  const actionData = ACTIONS_INDEX[action] || {
                    label: action === 'review' ? 'Đánh giá sản phẩm' : action,
                    color: action === 'review'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
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

          {isReviewModalOpen && reviewItem && (
            <ReviewModal
              isOpen={isReviewModalOpen}
              onClose={() => {
                setIsReviewModalOpen(false);
                setReviewItem(null);
              }}
              code={order?.order_code}
              orderItemId={reviewItem.orderItemId}
              productId={reviewItem.productId}
              productName={reviewItem.productName}
              productImage={reviewItem.productImage}
              existingReview={reviewItem.existingReview}
              refetch={refetch}

            />
          )}

          {/* View Review Modal */}
          {isReviewModalOpen && selectedReview && !reviewItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Đánh giá sản phẩm</h3>
                  <button
                    onClick={() => {
                      setIsReviewModalOpen(false);
                      setSelectedReview(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          {i < selectedReview.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(selectedReview.updated_at)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {reviewItemState?.is_updated === true && "Đã chỉnh sửa"}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedReview.content}</p>
                  </div>

                  {selectedReview.images && selectedReview.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedReview.images.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  {
                    !reviewItemState?.is_updated && reviewItemState?.is_updated == null && <div className="flex justify-end space-x-2 mt-4">
                      <button
                        onClick={() => {
                          setIsReviewModalOpen(false);
                          setSelectedReview(null);
                        }}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
                      >
                        Đóng
                      </button>
                      <button
                        onClick={() => {
                          const item = order.items.find((item: any) => item.id === selectedReview.order_item_id);
                          if (item) {
                            setReviewItem({
                              orderItemId: item.id,
                              productId: item.product_id,
                              productName: item.product_name,
                              productImage: item.image,
                              existingReview: selectedReview
                            });
                            setSelectedReview(null);
                          }
                        }}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium"
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  }
                  {
                    reviewItemState?.reply && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">Admin</span>
                          <span className="text-sm text-gray-500">
                            {formatDateTime(reviewItemState.reply_at)}
                          </span>
                        </div>
                        <p className="text-gray-700">{reviewItemState.reply}</p>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </TailwindComponent>
  );
};

export default OrderDetailUser;

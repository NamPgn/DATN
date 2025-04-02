import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Card,
  Spin,
  Descriptions,
  Table,
  Tag,
  Timeline,
  Button,
  Modal,
  Input,
  message,
} from "antd";
import {
  approveOrderUser,
  cancelOrder,
  confirmOrder,
  confirmReturnReceivedOrderUser,
  getOrder,
  refunAutoOrderUser,
  refundManualOrderUser,
  refundPartialOrderUser,
  rejectReturnOrderUser,
} from "../../../../sevices/orders";
import dayjs from "dayjs";
import TailwindComponent from "../../../../components/Tailwind/TailwinComponent";
import RefundModal from "./detailModal/modalRefunManual";
import RefundModalPatrial from "./detailModal/modalRefundPartial";
const ACTION_MAP: any = {
  confirm: {
    label: "✅ Xác nhận đơn hàng",
    color: "blue",
    variant: "dashed",
    action: "confirm",
  },
  cancel: {
    label: "❌ Hủy đơn hàng (admin)",
    color: "red",
    variant: "filled",
    action: "cancel",
  },
  approve_return: {
    label: "✅ Đồng ý hoàn hàng",
    color: "green",
    variant: "filled",
    action: "approve_return",
  },
  reject_return: {
    label: "❌ Từ chối hoàn hàng",
    color: "volcano",
    variant: "outlined",
    action: "reject_return",
  },
  refun_auto: {
    label: "🔁 Hoàn tiền tự động (VNPAY)",
    color: "purple",
    variant: "outlined",
    action: "refun_auto",
  },
  refund_manual: {
    label: "💵 Hoàn tiền thủ công",
    color: "gold",
    variant: "outlined",
    action: "refund_manual",
  },
  refund_partial: {
    label: "💳 Hoàn tiền một phần",
    color: "cyan",
    variant: "outlined",
    action: "refund_partial",
  },
  confirm_return_received: {
    label: "📦 Xác nhận đã nhận lại hàng",
    color: "magenta",
    variant: "outlined",
    action: "confirm_return_received",
  },
};

const OrdersDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["order", id], () => getOrder(id!));
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isModalOpenRefundManual, setisModalOpenRefundManual] = useState(false);
  const [isModalOpenRefundPatial, setisModalOpenRefundPatial] = useState(false);
  const [modalAction, setModalAction] = useState<
    "cancel" | "reject_return" | null
  >(null);
  const mutation = useMutation({
    mutationFn: async () => {
      return await confirmOrder({
        code: order?.order_code,
      });
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries(["order", id]);
      setLoadingAction(null);
    },
    onError: () => {
      message.error("Cập nhật thất bại!");
    },
    onSettled: () => {
      setLoadingAction(null);
    },
  });
  const cancelMutate = useMutation({
    mutationFn: async () => {
      return await cancelOrder({
        cancel_reason: cancelReason,
        code: order?.order_code,
      });
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái thành công!");
      queryClient.invalidateQueries(["order", id]);
      setIsCancelModalOpen(false);
    },
    onError: () => {
      message.error("Cập nhật thất bại!");
    },
  });

  const approveMutate = useMutation({
    mutationFn: async () => {
      return await approveOrderUser({
        code: order?.order_code,
      });
    },
    onSuccess: (data: any) => {
      message.success(data?.data?.message);
      queryClient.invalidateQueries(["order", id]);
      setIsCancelModalOpen(false);
      setLoadingAction(null);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message);
    },
    onSettled: () => {
      setLoadingAction(null);
    },
  });

  const rejectMutate = useMutation({
    mutationFn: async () => {
      return await rejectReturnOrderUser({
        code: order?.order_code,
        reject_reason: cancelReason,
      });
    },
    onSuccess: (data: any) => {
      message.success(data?.data?.message);
      queryClient.invalidateQueries(["order", id]);
      setIsCancelModalOpen(false);
      setLoadingAction(null);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message);
    },
    onSettled: () => {
      setLoadingAction(null);
    },
  });

  const refundAutoMutate = useMutation({
    mutationFn: async () => {
      return await refunAutoOrderUser({
        code: order?.order_code,
      });
    },
    onSuccess: (data: any) => {
      message.success(data?.data?.message);
      queryClient.invalidateQueries(["order", id]);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message);
    },
  });

  const refundMutation = useMutation({
    mutationFn: async (data: any) => {
      await refundManualOrderUser(data);
    },
    onSuccess: () => {
      message.success("Hoàn tiền thành công!");
      setisModalOpenRefundManual(false);
    },
    onError: () => {
      message.error("Hoàn tiền thất bại!");
    },
  });

  const refundMutationPatial = useMutation({
    mutationFn: async (data: any) => {
      await refundPartialOrderUser(data);
    },
    onSuccess: () => {
      message.success("Hoàn tiền thành công!");
      setisModalOpenRefundPatial(false);
    },
    onError: () => {
      message.error("Hoàn tiền thất bại!");
    },
  });

  const confirmReturnReceivedMutate = useMutation({
    mutationFn: async () => {
      return await confirmReturnReceivedOrderUser({
        code: order?.order_code,
      });
    },
    onSuccess: (data: any) => {
      message.success(data?.data?.message);
      queryClient.invalidateQueries(["order", id]);
      setIsCancelModalOpen(false);
      setLoadingAction(null);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message);
    },
    onSettled: () => {
      setLoadingAction(null);
    },
  });
  if (isLoading) {
    return <Spin />;
  }

  const order = data?.data?.data;

  if (!order) {
    return <p>Không tìm thấy đơn hàng.</p>;
  }

  const getTagColor = (changedBy: string) => {
    switch (changedBy) {
      case "system":
        return "purple";
      case "user":
        return "green";
      case "admin":
        return "blue";
      default:
        return "gray";
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2">
          <img src={record.image} alt={text} className="w-12 h-12 rounded" />
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Biến thể",
      dataIndex: "variation",
      key: "variation",
      render: (variation: string) => {
        const variations = JSON.parse(variation);
        return Object.entries(variations).map(([key, value]: any) => (
          <Tag key={key} color="blue">
            {key}: {value}
          </Tag>
        ));
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        new Intl.NumberFormat("vi-VN").format(price) + "₫",
    },
  ];

  const handleConfirmOrder = () => {
    mutation.mutate();
  };

  const handleApproveOrder = () => {
    approveMutate.mutate();
  };

  const handleConfirmReturnReceivedOrder = () => {
    confirmReturnReceivedMutate.mutate();
  };

  const handleCancelOrder = () => {
    setIsCancelModalOpen(true);
  };

  const handleRefundAutoOrder = () => {
    refundAutoMutate.mutate();
  };

  const handleRefundManual = () => {
    setisModalOpenRefundManual(true);
  };

  const handleRefundPatial = () => {
    setisModalOpenRefundPatial(true);
  };

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) {
      message.warning("Vui lòng nhập lý do!");
      return;
    }

    if (modalAction === "cancel") {
      cancelMutate.mutate();
    } else if (modalAction === "reject_return") {
      rejectMutate.mutate();
    }
  };

  const handleClickAction = async (action: any) => {
    setLoadingAction(action.action);
    setModalAction(action?.action);
    switch (action?.action) {
      case "confirm":
        handleConfirmOrder();
        break;
      case "cancel":
        handleCancelOrder();
        break;
      case "approve_return":
        handleApproveOrder();
        break;
      case "reject_return":
        handleCancelOrder();
        break;
      case "refund_manual":
        handleRefundManual();
        break;
      case "refund_auto":
        handleRefundAutoOrder();
        break;
      case "refund_partial":
        handleRefundPatial();
        break;
      case "confirm_return_received":
        handleConfirmReturnReceivedOrder();
        break;
      default:
        break;
    }
  };
  return (
    <TailwindComponent>
      <Card
        title={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Mã đơn hàng: ${order.order_code}
              <div className="flex gap-2">
                {order.actions.map((action: any) => {
                  const actionData = ACTION_MAP[action];

                  if (!actionData) return null;

                  return (
                    <Button
                      key={action}
                      variant={actionData.variant}
                      color={actionData.color}
                      onClick={() => handleClickAction(actionData)}
                      loading={loadingAction === actionData?.action}
                    >
                      {actionData.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </>
        }
        bordered={false}
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Tên người nhận">
            {order.o_name}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {order.o_phone}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {order.o_address}
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {order.payment_method === "ship_cod"
              ? "Thanh toán khi nhận hàng"
              : order.payment_method}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {new Intl.NumberFormat("vi-VN").format(order.final_amount)}₫
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái đơn hàng">
            <Tag color="gold">{order.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái thanh toán">
            <Tag color="red">{order.payment_status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái giao hàng">
            <Tag color="blue">{order.shipping_status}</Tag>
          </Descriptions.Item>
        </Descriptions>

        <Table
          columns={columns}
          dataSource={order.items}
          rowKey="product_name"
          pagination={false}
          className="mt-4"
        />

        <Card title="Lịch sử trạng thái đơn hàng" className="mt-6">
          <Timeline mode="alternate">
            {order?.status_timelines.map((timeline: any, index: any) => (
              <Timeline.Item key={index}>
                <p className="font-semibold">{timeline.to}</p>
                <p>
                  Thay đổi bởi:{" "}
                  <Tag color={getTagColor(timeline.changed_by)}>
                    {timeline.changed_by === "system"
                      ? "Hệ thống"
                      : timeline.changed_by === "user"
                      ? "Người dùng"
                      : "Quản trị viên"}
                  </Tag>
                </p>
                <p className="text-gray-500">
                  {dayjs(timeline.changed_at).format("DD/MM/YYYY HH:mm:ss")}
                </p>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        <Modal
          title={
            modalAction === "cancel"
              ? "Nhập lý do hủy đơn"
              : "Nhập lý do từ chối hoàn hàng"
          }
          open={isCancelModalOpen}
          onOk={handleConfirmCancel}
          onCancel={() => setIsCancelModalOpen(false)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Input.TextArea
            rows={4}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Nhập lý do..."
          />
        </Modal>
        <RefundModal
          visible={isModalOpenRefundManual}
          onCancel={() => setisModalOpenRefundManual(false)}
          onSubmit={refundMutation.mutate}
        />

        <RefundModalPatrial
          visible={isModalOpenRefundPatial}
          onCancel={() => setisModalOpenRefundPatial(false)}
          onSubmit={refundMutationPatial.mutate}
        />
      </Card>
    </TailwindComponent>
  );
};

export default OrdersDetail;

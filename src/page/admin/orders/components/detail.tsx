import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Divider,
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
import {
  CheckCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
  UpOutlined,
} from "@ant-design/icons";
import DetailNote from "./detailModal/detailNote";
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
  ship: {
    label: "📦 Gửi đơn hàng",
    color: "magenta",
    variant: "filled",
    action: "ship",
  },
};

const columnsShipment = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Mã đơn hàng",
    dataIndex: "order_id",
    key: "order_id",
  },
  {
    title: "Mã vận đơn",
    dataIndex: "shipping_code",
    key: "shipping_code",
    render: (text: any) => (text ? text : ""),
  },
  {
    title: "Trạng thái vận đơn",
    dataIndex: "shipping_status_name",
    key: "shipping_status_name",
  },
  {
    title: "Nhà vận chuyển",
    dataIndex: "carrier",
    key: "carrier",
  },
  {
    title: "Ngày dự tính từ",
    dataIndex: "from_estimate_date",
    key: "from_estimate_date",
    render: (text: any) => (text ? text : ""),
  },
  {
    title: "Ngày dự tính đến",
    dataIndex: "to_estimate_date",
    key: "to_estimate_date",
    render: (text: any) => (text ? text : ""),
  },
  {
    title: "Phí vận chuyển",
    dataIndex: "shipping_fee_details",
    key: "shipping_fee_details",
    render: (text: any) => (text ? text : ""),
  },
  {
    title: "Xác nhận trả hàng",
    dataIndex: "return_confirmed",
    key: "return_confirmed",
    render: (text: any) => (text !== null ? text.toString() : ""),
  },
  {
    title: "Lý do huỷ",
    dataIndex: "cancel_reason",
    key: "cancel_reason",
    render: (text: any) => (text ? text : ""),
  },
];

const columnRefun = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Loại giao dịch",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: any) => (
      <Tag color={status === "approved" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Lý do",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
  },
];

const getStatusIcon = (status: any) => {
  switch (status) {
    case "ready_to_pick":
      return <CheckCircleOutlined style={{ color: "green" }} />;
    default:
      return <ExclamationCircleOutlined style={{ color: "red" }} />;
  }
};
const OrdersDetail = () => {
  const { id } = useParams();
  const redirect = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["order", id], () => getOrder(id!));
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isModalOpenRefundManual, setisModalOpenRefundManual] = useState(false);
  const [isModalOpenRefundPatial, setisModalOpenRefundPatial] = useState(false);
  const [isModalNoteVisible, setIsModalNoteVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState<any>(null);
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

  const handleShowModalNote = ({ extra_details }: any) => {
    setModalDetails(extra_details);
    setIsModalNoteVisible(true);
  };

  const handleCancelNote = () => {
    setIsModalNoteVisible(false);
  };
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

  const columnsTransaction = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "pending" ? "yellow" : "green"}>{status}</Tag>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()} VND`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (details: any, _: any) => {
        return (
          <div>
            <Button
              variant="dashed"
              color="geekblue"
              icon={<EyeFilled />}
              onClick={() => handleShowModalNote(_)}
            >
              Chi tiết
            </Button>
          </div>
        );
      },
    },
  ];

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
        const variations =
          variation && variation !== "null" ? JSON.parse(variation) : {};
        return Object.keys(variations).length > 0 ? (
          Object.entries(variations).map(([key, value]: any) => (
            <Tag key={key} color="blue">
              {key}: {value}
            </Tag>
          ))
        ) : (
          <Tag color="gray">Không có biến thể</Tag>
        );
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

  const handleSendOrder = () => {
    redirect("/dashboard/orders/send/" + order?.order_id);
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
      case "ship":
        handleSendOrder();
        break;
      default:
        break;
    }
  };

  const dataRefund = order?.refund_requests?.map((item: any) => ({
    key: item.id,
    ...item,
    details: Object.entries(item.details).map(([key, value]) => ({
      detailKey: key,
      detailValue: value || "Không có thông tin",
    })),
  }));

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
              Mã đơn hàng: #{order.order_code}
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
        <p className="text-gray-500 text-sm mb-3">
          {order.subtitle && order.subtitle}
        </p>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Tên người nhận">
            {order.o_name}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {order.o_phone}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {order.o_address.replace(/,\s*,*/g, ",").replace(/,\s*$/, "")}
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
                      : timeline.changed_by === "staff"
                      ? "Nhân viên"
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

        <DetailNote
          isModalVisible={isModalNoteVisible}
          handleCancel={handleCancelNote}
          modalDetails={modalDetails}
        />

        <div>
          {order?.transactions && order.transactions.length > 0 && (
            <Card title="Quản lý thanh toán" className="my-5">
              <Table
                columns={columnsTransaction}
                dataSource={order?.transactions}
                rowKey="id"
                pagination={false}
              />
            </Card>
          )}

          {dataRefund && dataRefund.length > 0 && (
            <Card title="Yêu cầu hoàn tiền" className="mb-5">
              <Table
                columns={columnRefun}
                dataSource={dataRefund}
                pagination={false}
              />
            </Card>
          )}

          {order?.shipment && Object.keys(order.shipment).length > 0 && (
            <Card title="Quản lý vận chuyển" className="mb-5">
              <Table
                columns={columnsShipment}
                dataSource={[order?.shipment]}
                rowKey="id"
              />
            </Card>
          )}

          {order?.shipping_logs && order.shipping_logs.length > 0 && (
            <Card title="Quá Trình Vận Chuyển" className="mb-5">
              <Timeline className="mt-3">
                {order.shipping_logs.map((item: any, index: number) => (
                  <Timeline.Item
                    key={index}
                    color={item.status === "ready_to_pick" ? "green" : "red"}
                    dot={getStatusIcon(item.status)}
                  >
                    <div>
                      <strong>{item.note}</strong>
                      <p>
                        {item.location
                          ? `Địa điểm: ${item.location}`
                          : "Không có thông tin địa điểm"}
                      </p>
                      <small>
                        {new Date(item.created_at).toLocaleString()}
                      </small>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          )}
        </div>
      </Card>
    </TailwindComponent>
  );
};

export default OrdersDetail;

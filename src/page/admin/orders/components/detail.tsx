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
  Carousel,
} from "antd";
import { getOrder } from "../../../../sevices/orders";
import dayjs from "dayjs";
import TailwindComponent from "../../../../components/Tailwind/TailwinComponent";

const OrdersDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["order", id], () => getOrder(id!));

  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoading) {
    return <Spin />;
  }

  const order = data?.data?.data;

  if (!order) {
    return <p>Không tìm thấy đơn hàng.</p>;
  }

  // Cột của bảng danh sách sản phẩm
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

  // API cập nhật trạng thái đơn hàng
  // const mutation = useMutation(updateOrderStatus, {
  //   onSuccess: () => {
  //     message.success("Cập nhật trạng thái thành công!");
  //     queryClient.invalidateQueries(["order", id]); // Refresh dữ liệu
  //   },
  //   onError: () => {
  //     message.error("Cập nhật thất bại!");
  //   },
  //   onSettled: () => {
  //     setLoading(false);
  //   },
  // });

  const handleConfirmOrder = () => {
    setLoading(true);
    // mutation.mutate({ orderId: id, status: "Đã xác nhận" });
  };

  // Xử lý mở modal hủy đơn
  const handleCancelOrder = () => {
    setIsCancelModalOpen(true);
  };

  // Xử lý xác nhận hủy đơn
  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) {
      message.warning("Vui lòng nhập lý do hủy!");
      return;
    }
    setLoading(true);
    // mutation.mutate({ orderId: id, status: "Đã hủy", reason: cancelReason });
    setIsCancelModalOpen(false);
  };
  const status_timelines = [
    {
      from: null,
      to: "Chờ xác nhận",
      changed_by: "system",
      changed_at: "2025-03-26 14:23:42",
    },
    {
      from: "Chờ xác nhận",
      to: "Đã xác nhận",
      changed_by: "user",
      changed_at: "2025-03-26 14:23:42",
    },
    {
      from: "Đã xác nhận",
      to: "Đang giao hàng",
      changed_by: "admin",
      changed_at: "2025-03-26 14:23:42",
    },
    {
      from: "Đang giao hàng",
      to: "Đã giao hàng",
      changed_by: "system",
      changed_at: "2025-03-26 14:23:42",
    },
    {
      from: "Đã giao hàng",
      to: "Hoàn thành",
      changed_by: "system",
      changed_at: "2025-03-26 14:23:42",
    },
  ];

  const getTagColor = (changedBy: string) => {
    switch (changedBy) {
      case "system":
        return "purple"; // Hệ thống
      case "user":
        return "green"; // Người dùng
      case "admin":
        return "blue"; // Quản trị viên
      default:
        return "gray";
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
                <Button
                  variant="dashed"
                  color="blue"
                  onClick={handleConfirmOrder}
                  loading={loading}
                  disabled={
                    order.status === "Đã xác nhận" || order.status === "Đã hủy"
                  }
                >
                  Chấp nhận
                </Button>
                <Button
                  variant="filled"
                  color="danger"
                  onClick={handleCancelOrder}
                  disabled={
                    order.status === "Đã xác nhận" || order.status === "Đã hủy"
                  }
                >
                  Hủy
                </Button>
              </div>
            </div>
          </>
        }
        bordered={false}
      >
        {/* Hiển thị thông tin đơn hàng */}
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
            {status_timelines.map((timeline, index) => (
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
          title="Nhập lý do hủy đơn"
          open={isCancelModalOpen}
          onOk={handleConfirmCancel}
          onCancel={() => setIsCancelModalOpen(false)}
          okText="Xác nhận hủy"
          cancelText="Hủy"
        >
          <Input.TextArea
            rows={4}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Nhập lý do hủy đơn hàng..."
          />
        </Modal>
      </Card>
    </TailwindComponent>
  );
};

export default OrdersDetail;

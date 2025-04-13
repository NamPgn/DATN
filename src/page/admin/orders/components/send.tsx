import { Form, Input, Button, Card, Select } from "antd";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrders } from "../../../../sevices/orders";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";

const SendOrder = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const nav=useNavigate();
  const { mutate: mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await updateOrders(data);
    },
    onSuccess: () => {
      toast.success("Gửi đơn hàng thành công");
      nav('/dashboard/orders/'+id)
    },
    onError: () => {
      toast.error("Gửi đơn hàng thất bại");
    },
  });
  const onFinish = (values: any) => {
    const data = {
      id: id,
      ...values,
    };
    mutate(data);
  };
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Card title="Gửi đơn hàng" bordered={false} style={{ width: "500px" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Ghi chú bắt buộc"
            name="required_note"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Select
              placeholder="Chọn ghi chú"
              options={[
                { value: "CHOTHUHANG", label: "Cho Thử Hàng" },
                {
                  value: "CHOXEMHANGKHONGTHU",
                  label: "Cho Xem Hàng Không Thử",
                },
                { value: "KHONGCHOXEMHANG", label: "Không Cho Xem Hàng" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <Input placeholder="Nhập ghi chú" />
          </Form.Item>

          <Form.Item label="Nội dung của đơn hàng" name="content">
            <Input placeholder="Nội dung của đơn hàng" />
          </Form.Item>

          <Button type="primary" icon={<EditOutlined />} htmlType="submit">
            Cập nhật
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SendOrder;

import {
  Form,
  Input,
  Button,
  Card,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { updateOrders } from "../../../../sevices/orders";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";

const SendOrder = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { mutate: mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await updateOrders(data);
    },
    onSuccess: () => {
      toast.success("Sửa thành công");
    },
    onError: () => {
      toast.error("Sửa thất bại");
    },
  });
  const onFinish = (values: any) => {
    const data = {
      id: id,
      o_name: values.o_name,
      o_address: values.o_address,
      o_phone: values.o_phone,
      o_mail: values.o_mail,
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
          <div
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Form.Item
              label="Chiều dài"
              name="length"
              rules={[
                { required: true, message: "Vui lòng nhập chiều dài!" },
                {
                  type: "number",
                  min: 1,
                  message: "Chiều dài phải lớn hơn 0!",
                },
              ]}
            >
              <InputNumber placeholder="Nhập chiều dài" />
            </Form.Item>

            <Form.Item
              label="Chiều rộng"
              name="width"
              rules={[
                { required: true, message: "Vui lòng nhập chiều rộng!" },
                {
                  type: "number",
                  min: 1,
                  message: "Chiều rộng phải lớn hơn 0!",
                },
              ]}
            >
              <InputNumber placeholder="Nhập chiều rộng" />
            </Form.Item>

            <Form.Item
              label="Chiều cao"
              name="height"
              rules={[
                { required: true, message: "Vui lòng nhập chiều cao!" },
                { pattern: /^[0-9]+$/, message: "Chỉ được nhập số!" },
                {
                  type: "number",
                  min: 1,
                  message: "Chiều cao phải lớn hơn 0!",
                },
              ]}
            >
              <InputNumber placeholder="Nhập chiều cao" />
            </Form.Item>

            <Form.Item label="Giá trị đơn hàng" name="insurance_value">
              <InputNumber placeholder="Nhập giá trị đơn hàng" />
            </Form.Item>
          </div>

          <Form.Item
            label="Ghi chú bắt buộc"
            name="required_note"
            rules={[{ required: true, message: "Bắt buộc!" }]}
          >
            <Select
              placeholder="Chọn ghi chú"
              options={[
                { value: "chothuhang", label: "Cho Thử Hàng" },
                {
                  value: "choxemhangkhongthu",
                  label: "Cho Xem Hàng Không Thử",
                },
                { value: "khongchoxemhang", label: "Không Cho Xem Hàng" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Người thanh toán dịch vụ"
            name="payment_type_id"
            rules={[
              { required: true, message: "Vui lòng chọn người thanh toán!" },
            ]}
          >
            <Select
              placeholder="Chọn người thanh toán"
              options={[
                { value: "1", label: "Người Bán/Người Gửi" },
                { value: "2", label: "Người Mua/Người Nhận" },
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

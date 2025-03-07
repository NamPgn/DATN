import { Form, Input, Button, Card, Spin } from "antd";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOrder, updateOrders } from "../../../../sevices/orders";
import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";

const EditOrder = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, isLoading } = useQuery(["order", id], () => getOrder(id!));
  const orderData = data?.data?.data;
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
  if (isLoading) return <Spin />;
  return (
    <Card title={`Chỉnh sửa đơn hàng: ${orderData?.code}`} bordered={false}>
      <Form
        form={form}
        layout="vertical"
        initialValues={orderData}
        onFinish={onFinish}
      >
        <Form.Item label="Tên khách hàng" name="o_name">
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="o_phone">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="o_mail">
          <Input />
        </Form.Item>
        <Form.Item label="Mã đơn hàng" name="code">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Phương thức thanh toán" name="payment_method">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Số tiền tổng" name="total_amount">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Phí vận chuyển" name="shipping">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Ghi chú" name="note">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="o_address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ mới!" }]}
        >
          <Input />
        </Form.Item>
        <Button
          color="blue"
          icon={<EditOutlined />}
          variant="filled"
          htmlType="submit"
        >
          Cập nhật
        </Button>
      </Form>
    </Card>
  );
};

export default EditOrder;

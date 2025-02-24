import { useEffect } from "react";
import { Form, Input, Button, Card, Select, Spin } from "antd";
import { useMutation, useQuery } from "react-query";
import { getOrder, updateOrders } from "../../../../sevices/orders";
import { useParams } from "react-router-dom";
import { STATUSOPTIONS } from "../../../../constant";
import { toast } from "react-toastify";

const EditOrder = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data: orderGet, isLoading } = useQuery(["order", id], () =>
    getOrder(id!)
  );

  const order = orderGet?.data?.data;

  useEffect(() => {
    if (order) {
      form.setFieldsValue(order);
    }
  }, [order, form]);

  const currentStatus = Number(order?.stt_track);

  const allowedNextStatus =
    STATUSOPTIONS.find((status) => Number(status.id) === currentStatus)?.next ||
    [];
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await updateOrders(data);
    },
    onSuccess: () => {
      toast.success("Sửa thành công");
    },
    onError: () => {
      toast.success("Sửa thành công");
    },
  });
  const onFinish = (values: any) => {
    const data = {
      id: id,
      ...values,
    };
    mutate(data);
  };

  if (isLoading) {
    return <Spin />;
  }
  return (
    <Card title={`Edit Order: ${order?.code}`} bordered={false}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="User ID"
          name="user_id"
          rules={[{ required: true, message: "User ID is required" }]}
        >
          <Input placeholder="Enter User ID" />
        </Form.Item>

        <Form.Item label="Code" name="code">
          <Input placeholder="Enter Order Code" />
        </Form.Item>

        <Form.Item label="Total Amount" name="total_amount">
          <Input type="number" placeholder="Enter Total Amount" />
        </Form.Item>

        <Form.Item label="Discount Amount" name="discount_amount">
          <Input type="number" placeholder="Enter Discount Amount" />
        </Form.Item>

        <Form.Item label="Final Amount" name="final_amount">
          <Input type="number" placeholder="Enter Final Amount" />
        </Form.Item>

        <Form.Item label="Payment Method" name="payment_method">
          <Select placeholder="Select Payment Method">
            <Select.Option value="credit-card">Credit Card</Select.Option>
            <Select.Option value="e-wallets">E-Wallets</Select.Option>
            <Select.Option value="bank-transfer">Bank Transfer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Shipping Cost" name="shipping">
          <Input type="number" placeholder="Enter Shipping Cost" />
        </Form.Item>

        <Form.Item label="Order Name" name="o_name">
          <Input placeholder="Enter Order Name" />
        </Form.Item>

        <Form.Item label="Address" name="o_address">
          <Input.TextArea placeholder="Enter Address" />
        </Form.Item>

        <Form.Item label="Phone" name="o_phone">
          <Input placeholder="Enter Phone Number" />
        </Form.Item>

        <Form.Item label="Email" name="o_mail">
          <Input type="email" placeholder="Enter Email" />
        </Form.Item>

        <Form.Item label="Tracking Status" name="stt_track">
          <Select>
            {STATUSOPTIONS.map((status) => {
              return (
                <Select.Option
                  key={status.id}
                  value={Number(status.id)}
                  disabled={
                    !allowedNextStatus.includes(status.id) &&
                    Number(status.id) !== currentStatus
                  }
                >
                  {status.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Payment Status" name="stt_payment">
          <Select defaultValue={order?.stt_payment}>
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Created At" name="created_at">
          <Input disabled />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Card>
  );
};

export default EditOrder;

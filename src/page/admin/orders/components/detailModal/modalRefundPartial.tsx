import { Modal, InputNumber, Form } from "antd";
import { useState } from "react";
interface RefundModalPatrialProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const RefundModalPatrial: React.FC<RefundModalPatrialProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = { ...values };
      onSubmit(formData);
      form.resetFields();
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Xác nhận hoàn tiền"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="amount"
          label="Số tiền"
          rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1000}
            placeholder="Nhập số tiền..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RefundModalPatrial;

import { Modal, Input, InputNumber, Form, Button, Upload, message } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkrn3fe2o/upload";
const CLOUDINARY_UPLOAD_PRESET = "sevenstyle";
interface RefundModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const RefundModal: React.FC<RefundModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Thay bằng preset của bạn

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload thất bại!");
      return await res.json();
    },
    onSuccess: (data: any) => {
      message.success("Upload ảnh thành công!");
      setImageUrl(data.secure_url);
    },
    onError: () => {
      message.error("Upload ảnh thất bại!");
    },
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (!imageUrl) {
        message.warning("Vui lòng upload ảnh bằng chứng!");
        return;
      }

      const formData = { ...values, proof_image: imageUrl };
      onSubmit(formData); 
      form.resetFields();
      setImageUrl(null);
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
        <Form.Item label="Ảnh bằng chứng">
          <Upload
            beforeUpload={(file) => {
              uploadMutation.mutate(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button
              icon={<UploadOutlined />}
              loading={uploadMutation.isLoading}
            >
              {imageUrl ? "Ảnh đã tải lên" : "Tải ảnh lên"}
            </Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Bằng chứng"
              style={{ width: "100%", marginTop: 10 }}
            />
          )}
        </Form.Item>

        <Form.Item
          name="note"
          label="Ghi chú"
          rules={[{ required: true, message: "Vui lòng nhập ghi chú!" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập ghi chú..." />
        </Form.Item>

        <Form.Item
          name="transfer_reference"
          label="Mã giao dịch"
          rules={[{ required: true, message: "Vui lòng nhập mã giao dịch!" }]}
        >
          <Input placeholder="Nhập mã giao dịch..." />
        </Form.Item>

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

export default RefundModal;

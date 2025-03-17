import { Form, Input, Button, message, Select } from "antd";
import { useMutation, useQuery } from "react-query";
import { SyncOutlined } from "@ant-design/icons";
import { addAttribute } from "../../../../sevices/attribute";

const AddAttribute = () => {
  const [form] = Form.useForm();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await addAttribute(values);
    },
    onSuccess: () => {
      message.success("Thuộc tính được tạo thành công!");
    },
    onError: () => {
      message.error("Tạo thuộc tính thất bại!");
    },
  });

  const handleSubmit = async (values: any) => {
    mutate(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Tên thuộc tính"
        name="name"
        rules={[
          { required: true, message: "Vui lòng nhập tên thuộc tính!" },
          {
            max: 100,
            message: "Tên thuộc tính không được vượt quá 100 ký tự!",
          },
        ]}
      >
        <Input placeholder="Nhập tên thuộc tính" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
        >
          Tạo thuộc tính
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAttribute;

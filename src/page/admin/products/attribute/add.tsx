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
      message.success("Attribute created successfully!");
    },
    onError: () => {
      message.error("Attribute created failure!");
    },
  });

  const handleSubmit = async (values: any) => {
    mutate(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Attribute Name"
        name="name"
        rules={[
          { required: true, message: "Please enter the Attribute name!" },
          { max: 100, message: "Attribute name cannot exceed 50 characters!" },
        ]}
      >
        <Input placeholder="Enter Attribute name" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
        >
          Create Attribute
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAttribute;

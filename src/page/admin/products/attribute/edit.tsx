import {
  Form,
  Input,
  Button,
  message,
  Checkbox,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getAttribute, updateAttribute } from "../../../../sevices/attribute";

const EditAttribute = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: findById } = useQuery({
    queryKey: ["attribute", id],
    queryFn: async () => (await getAttribute(id)).data,
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await updateAttribute(id, values);
    },
    onSuccess: () => {
      message.success("Thuộc tính được tạo thành công!");
    },
    onError: () => {
      message.error("Tạo thuộc tính thất bại!");
    },
  });
  const handleSubmit = (values: any) => {
    console.log(values);
    mutate(values);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={findById}
    >
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
      <Form.Item
        name="is_default"
        valuePropName="checked"
        getValueProps={(value) => ({ checked: value === 1 })}
        normalize={(value) => (value ? 1 : 0)}
      >
        <Checkbox>Mặc định</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
        >
          Cập nhật thuộc tính
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAttribute;

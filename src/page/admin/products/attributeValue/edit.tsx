import { Form, Input, Button, message } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  getAttributesVal,
  updateAttributesVal,
} from "../../../../sevices/attributeValue";

const EditAttributeVal = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: findById } = useQuery({
    queryKey: ["attributeVal", id],
    queryFn: async () => (await getAttributesVal(id)).data,
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await updateAttributesVal(id, values);
    },
    onSuccess: () => {
      message.success("Cập nhật giá trị thuộc tính thành công!");
    },
    onError: () => {
      message.error("Cập nhật giá trị thuộc tính thất bại!");
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
        label="Tên giá trị thuộc tính"
        name="name"
        rules={[
          { required: true, message: "Vui lòng nhập tên giá trị thuộc tính!" },
          {
            max: 100,
            message: "Tên giá trị thuộc tính không được vượt quá 50 ký tự!",
          },
        ]}
      >
        <Input placeholder="Nhập tên giá trị thuộc tính" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
        >
          Cập nhật giá trị thuộc tính
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAttributeVal;

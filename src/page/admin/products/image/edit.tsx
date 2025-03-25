import { Form, Input, Button, message } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  getAttributesVal,
  updateAttributesVal,
} from "../../../../sevices/attributeValue";

const EditImageProduct = () => {
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
      message.success("Tạo thuộc tính thành công!");
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
            message: "Tên thuộc tính không được vượt quá 50 ký tự!",
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
          Sửa giá trị thuộc tính
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditImageProduct;

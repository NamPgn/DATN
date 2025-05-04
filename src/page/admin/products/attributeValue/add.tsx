/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, message, Select } from "antd";
import { useMutation, useQuery } from "react-query";
import { SyncOutlined } from "@ant-design/icons";
import { addAttributesVal } from "../../../../sevices/attributeValue";
import { useState } from "react";
import { getAttributes } from "../../../../sevices/attribute";

const AddAttributeValue = () => {
  const [form] = Form.useForm();
  const [page, _setPage] = useState(1);
  const { data: attributeVal }: any = useQuery({
    queryKey: ["attributeVal", page],
    queryFn: async () => (await getAttributes(page)).data?.data,
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await addAttributesVal(values);
    },
    onSuccess: () => {
      message.success("Tạo giá trị thuộc tính thành công!");
    },
    onError: () => {
      message.error("Tạo giá trị thuộc tính thất bại!");
    },
  });

  const handleSubmit = async (values: any) => {
    mutate(values);
  };
  const optionsSelectAttributesVal = attributeVal?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
      <Form.Item label="Thuộc tính" name="attribute_id">
        <Select
          style={{ width: "200px" }}
          placeholder="Vui lòng chọn"
          options={optionsSelectAttributesVal || []}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
        >
          Tạo giá trị thuộc tính
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAttributeValue;

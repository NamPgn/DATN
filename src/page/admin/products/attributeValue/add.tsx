import { Form, Input, Button, message, Select } from "antd";
import { useMutation, useQuery } from "react-query";
import { SyncOutlined } from "@ant-design/icons";
import {
  addAttributesVal,
  getAttributesVals,
} from "../../../../sevices/attributeValue";
import { useState } from "react";
import { getAttributes } from "../../../../sevices/attribute";

const AddAttributeValue = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const { data: attributeVal, refetch }: any = useQuery({
    queryKey: ["attributeVal", page],
    queryFn: async () => (await getAttributes(page)).data?.data,
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await addAttributesVal(values);
    },
    onSuccess: () => {
      message.success("AttributeValue created successfully!");
    },
    onError: () => {
      message.error("AttributeValue created failure!");
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
        label="AttributeValue Name"
        name="name"
        rules={[
          { required: true, message: "Please enter the AttributeValue name!" },
          {
            max: 100,
            message: "AttributeValue name cannot exceed 50 characters!",
          },
        ]}
      >
        <Input placeholder="Enter AttributeValue name" />
      </Form.Item>
      <Form.Item label="Attribute Id" name="attribute_id">
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
          Create AttributeValue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAttributeValue;

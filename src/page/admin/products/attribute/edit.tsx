import {
  Form,
  Input,
  Button,
  Upload,
  Switch,
  message,
  Select,
  CheckboxProps,
  Checkbox,
} from "antd";
import { SyncOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
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
      message.success("Attribute created successfully!");
    },
    onError: () => {
      message.error("Attribute created failure!");
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
        label="Attribute Name"
        name="name"
        rules={[
          { required: true, message: "Please enter the Attribute name!" },
          { max: 100, message: "Attribute name cannot exceed 50 characters!" },
        ]}
      >
        <Input placeholder="Enter Attribute name" />
      </Form.Item>
      <Form.Item
        name="is_default"
        valuePropName="checked"
        getValueProps={(value) => ({ checked: value === 1 })}
        normalize={(value) => (value ? 1 : 0)}
      >
        <Checkbox>Checkbox</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
          block
        >
          Update Attribute
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditAttribute;

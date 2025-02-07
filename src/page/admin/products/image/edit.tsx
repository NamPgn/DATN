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
  import { updateAttribute } from "../../../../sevices/attribute";
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
        message.success("AttributeVal created successfully!");
      },
      onError: () => {
        message.error("AttributeVal created failure!");
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
          label="AttributeVal Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the AttributeVal name!" },
            {
              max: 100,
              message: "AttributeVal name cannot exceed 50 characters!",
            },
          ]}
        >
          <Input placeholder="Enter AttributeVal name" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={isLoading ?? <SyncOutlined spin />}
            htmlType="submit"
          >
            Update AttributeVal
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default EditImageProduct;
  
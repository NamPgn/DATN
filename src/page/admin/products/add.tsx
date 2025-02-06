import {
  Form,
  Input,
  Button,
  message,
  Select,
  Modal,
  Tabs,
  Upload,
  List,
  Image,
} from "antd";
import { useMutation, useQuery } from "react-query";
import { PlusOutlined, SyncOutlined, UploadOutlined } from "@ant-design/icons";

import { useState } from "react";
import { getAttributes } from "../../../sevices/attribute";
import { addAttributesVal } from "../../../sevices/attributeValue";
import UploadImage from "./component/uploadImage";

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [selectImage, setSelectImage] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };
  const handleSubmit = (values: any) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one file!");
      return;
    }
    const formData: any = new FormData();
    fileList.forEach((file: any) => {
      formData.append("images[]", file.originFileObj);
    });
    mutate(formData);
  };
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
  console.log(visible)
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Popup
      </Button>
      <UploadImage
        visible={visible}
        onClose={() => setVisible(false)}
        setSelectImage={setSelectImage}
        selectImage={selectImage}
        onCancel={() => setVisible(false)}
      />
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="AttributeValue Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the AttributeValue name!",
            },
            {
              max: 100,
              message: "AttributeValue name cannot exceed 50 characters!",
            },
          ]}
        >
          <Input placeholder="Enter AttributeValue name" />
        </Form.Item>
        <Form.Item label="AttributeValue Name" name="name">
          <Input placeholder="Enter AttributeValue name" />
        </Form.Item>
        <Form.Item label="Attribute Id" name="attribute_id">
          <Select
            style={{ width: "200px" }}
            placeholder="Vui lòng chọn"
            options={[]}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            loading={isLoading ?? <SyncOutlined spin />}
            htmlType="submit"
            block
          >
            Create AttributeValue
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductAdd;

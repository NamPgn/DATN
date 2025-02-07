import { Form, Input, Button, message, Select } from "antd";
import { useMutation } from "react-query";
import { PlusOutlined, SyncOutlined } from "@ant-design/icons";

import { useState } from "react";
import UploadImage from "./component/uploadImage";
import { addProduct } from "../../../sevices/products";

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [visible, setVisible] = useState(false);
  const handleSubmit = (values: any) => {
    const data = {
      ...values,
      mainImage: selectOneImage?.id,
      imageListArr: selectImage.map((item: any) => item.id),
    };
    console.log("Dữ liệu gửi lên:", data);
  };
  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await addProduct(values);
    },
    onSuccess: () => {
      message.success("Products created successfully!");
    },
    onError: () => {
      message.error("Products created failure!");
    },
  });
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center border border-secondary border-dashed rounded p-3"
        style={{ width: "120px", height: "120px", cursor: "pointer" }}
        onClick={() => setVisible(true)}
      >
        <PlusOutlined className="text-4xl text-gray-500 hover:text-blue-500" />

        <span className="text-muted">Upload</span>
      </div>
      <UploadImage
        visible={visible}
        onClose={() => setVisible(false)}
        setSelectImage={setSelectImage}
        selectImage={selectImage}
        setSelectOneImage={setSelectOneImage}
        selectOneImage={selectOneImage}
        onCancel={() => setVisible(false)}
      />
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Products Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the Products name!",
            },
            {
              max: 100,
              message: "Products name cannot exceed 50 characters!",
            },
          ]}
        >
          <Input placeholder="Enter Products name" />
        </Form.Item>
        <Form.Item label="Products Name" name="name">
          <Input placeholder="Enter Products name" />
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
            
          >
            Create Products
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductAdd;

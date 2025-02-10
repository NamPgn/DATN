import { Button, Form, Input, InputNumber, message, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAttributesAll } from "../../../sevices/attribute";
import { getCategorysAll } from "../../../sevices/category";
import { getProduct, updateProduct } from "../../../sevices/products";
import UploadImage from "./component/uploadImage";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [variants, setVariants] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const { data: product, isLoading: loadingProduct } = useQuery(
    ["product", id],
    async () => (await getProduct(id)).data,
    {
      enabled: !!id,
      onSuccess: (data) => {
        form.setFieldsValue({ ...data });
        setSelectOneImage(data.main_image);
        setSelectImage(
          data?.product_images.map((item: any) => {
            return {
              id: item.public_id,
              url: item.url,
            };
          })
        );
        setVariants(data?.variants);
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: async (values: any) => await updateProduct(id, values),
    onSuccess: () => message.success("Sản phẩm đã được cập nhật thành công!"),
    onError: () => message.error("Cập nhật sản phẩm thất bại!"),
  });

  const { data: category }: any = useQuery(
    ["categories"],
    async () => {
      const res = await getCategorysAll();
      return res.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const { data: attrAll }: any = useQuery({
    queryKey: ["attrAll"],
    queryFn: async () => (await getAttributesAll())?.data,
  });

  const optionsSelectCategory = category?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));

  const handleSubmit = (values: any) => {
    const data = {
      mainImage: selectOneImage?.id,
      images: selectImage,
      ...values,
      variants,
    };
    mutate(data);
  };

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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={product}
      >
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input placeholder="Tên" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>

        <Form.Item name="short_description" label="Mô tả ngắn">
          <Input placeholder="Mô tả ngắn" />
        </Form.Item>

        <Form.Item label="Category Id" name="categories">
          <Select
            mode="multiple"
            placeholder="Vui lòng chọn"
            options={optionsSelectCategory}
          />
        </Form.Item>

        <Form.List name="variants">
          {(fields, { remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    marginBottom: 8,
                  }}
                >
                  <Form.Item {...restField} name={[name, "regular_price"]}>
                    <InputNumber min={0} placeholder="Giá gốc" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "sale_price"]}>
                    <InputNumber min={0} placeholder="Giá KM" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "stock_quantity"]}>
                    <InputNumber min={0} placeholder="Số lượng" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "sku"]}>
                    <Input />
                  </Form.Item>
                </Space>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductEdit;

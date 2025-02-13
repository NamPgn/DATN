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
  const [typeProduct, setTypeProduct] = useState("");
  const [dataEdit, setDataEdit]: any = useState(null);
  const [initialData, setInitialData] = useState<any>(null);
  const [resettingForm, setResettingForm] = useState(false);
  const { data: product, isLoading: loadingProduct } = useQuery(
    ["product", id],
    async () => (await getProduct(id)).data,
    {
      enabled: !!id,
      onSuccess: (data) => {
        form.setFieldsValue({ ...data });
        setSelectOneImage({
          id: data.main_image,
        });
        setSelectImage(
          data?.product_images.map((item: any) => {
            return {
              id: item.public_id,
              url: item.url,
            };
          })
        );
        setVariants(data?.variants);
        setTypeProduct(data.type);
        setDataEdit(data);
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    setTimeout(() => {
      if (typeProduct == dataEdit?.type) {
        form.resetFields();
        form.setFieldsValue({
          ...initialData,
        });
      } else {
        form.resetFields(["variants"]);
        setVariants([]);
        console.log("Cleared variants:", variants);
        form.setFieldsValue({
          regular_price: dataEdit?.regular_price || 0,
          sale_price: dataEdit?.sale_price || 0,
          stock_quantity: dataEdit?.stock_quantity || 0,
          sku: dataEdit?.sku || "",
        });
      }
    }, 100);
  }, [typeProduct]);

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

  const handleSubmit = (val: any) => {
    const data = {
      main_image: selectOneImage?.id,
      images: selectImage.map((item: any) => item.id),
      ...val,
      variants:
        typeProduct === "0"
          ? val.variants.map((item: any) => ({
              ...item,
            }))
          : [
              {
                regular_price: val.variants?.[0]?.regular_price || 0,
                sale_price: val.variants?.[0]?.sale_price || 0,
                sku: val.variants?.[0]?.sku || "",
                stock_quantity: val.variants?.[0]?.stock_quantity,
                values: [],
              },
            ],
    };
    mutate(data);
  };
  const handleChangeType = (values: string) => {
    setTypeProduct(values);
  };

  return (
    <>
      {/* <div
        className="d-flex flex-column align-items-center justify-content-center border border-secondary border-dashed rounded p-3"
        style={{ width: "120px", height: "120px", cursor: "pointer" }}
        onClick={() => setVisible(true)}
      >
        <PlusOutlined className="text-4xl text-gray-500 hover:text-blue-500" />
        <span className="text-muted">Upload</span>
      </div> */}
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

        <Form.Item name="slug" label="Slug">
          <Input.TextArea placeholder="Slug" />
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
        <Form.Item label="Type" name="type">
          <Select onChange={handleChangeType}>
            <Select.Option value={"0"}>Sản phẩm có biến thể</Select.Option>
            <Select.Option value={"1"}>Sản phẩm đơn giản</Select.Option>
          </Select>
        </Form.Item>
        {typeProduct === "0" ? (
          <>
            <Form.List name="variants">
              {(fields, { remove, add }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
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

                      <Form.Item {...restField} name={[name, "stock_quantity"]}>
                        <InputNumber min={0} placeholder="Số lượng" />
                      </Form.Item>

                      <Form.Item {...restField} name={[name, "sku"]}>
                        <Input
                          defaultValue={variants ? variants[index]?.sku : ""}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button onClick={add}>Thêm</Button>
                      </Form.Item>
                      <Button
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      />
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </>
        ) : (
          <>
            <Form.List name="variants">
              {(fields, { add, remove }) => {
                if (fields.length === 0) {
                  add();
                }
                return (
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
                        <Form.Item
                          {...restField}
                          name={[name, "regular_price"]}
                        >
                          <InputNumber
                            min={0}
                            placeholder="Giá gốc"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>

                        <Form.Item {...restField} name={[name, "sale_price"]}>
                          <InputNumber
                            min={0}
                            placeholder="Giá khuyến mãi"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "stock_quantity"]}
                        >
                          <InputNumber
                            min={0}
                            placeholder="Số Lượng"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>

                        <Form.Item {...restField} name={[name, "sku"]}>
                          <Input placeholder="Nhập mã SKU" />
                        </Form.Item>

                        <Button
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                  </>
                );
              }}
            </Form.List>
          </>
        )}

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

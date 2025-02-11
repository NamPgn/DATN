import { Button, Form, Input, InputNumber, message, Select, Space } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAttributesAll } from "../../../sevices/attribute";
import { getCategorysAll } from "../../../sevices/category";
import { addProduct } from "../../../sevices/products";
import UploadImage from "./component/uploadImage";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [selectImage, setSelectImage] = useState([]);
  const [selectOneImage, setSelectOneImage]: any = useState(null);
  const [variants, setVariants] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [typeProduct, setTypeProduct] = useState("1");
  const { isLoading, mutate } = useMutation({
    mutationFn: async (values: any) => {
      return await addProduct(values);
    },
    onSuccess: () => message.success("Sản phẩm đã được tạo thành công!"),
    onError: () => message.error("Tạo sản phẩm thất bại!"),
  });

  const { data: category }: any = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await getCategorysAll()).data,
  });

  const { data: attrAll }: any = useQuery({
    queryKey: ["attrAll"],
    queryFn: async () => (await getAttributesAll())?.data,
  });

  const optionsSelectCategory = category?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));

  // Danh sách size & màu
  const sizeOptions: any = [
    { label: "S", value: "1", id: 1 },
    { label: "M", value: "2", id: 2 },
    { label: "L", value: "3", id: 3 },
  ];
  const colorOptions: any = [
    { label: "Đỏ", value: "1", id: 1 },
    { label: "Xanh", value: "2", id: 2 },
    { label: "Vàng", value: "3", id: 3 },
  ];

  const handleVariantChange = (selectedSizes: any, selectedColors: any) => {
    const newVariants = selectedSizes?.flatMap((sizeId: number) =>
      selectedColors?.map((colorId: number) => ({
        size: sizeId,
        color: colorId,
        regular_price: 0,
        sale_price: 0,
        stock_quantity: 0,
        sku: `${
          colorOptions.find((c: any) => c.id == colorId)?.label || "N/A"
        }-${Date.now()}`,
        nam: [sizeId, colorId],
      }))
    );

    setVariants(newVariants);

    form.setFieldsValue({
      variants: newVariants.map((variant: any) => ({
        regular_price: variant.regular_price,
        stock_quantity: variant.stock_quantity,
        sku: variant.sku,
      })),
    });
  };

  const handleSubmit = (val: any) => {
    console.log(variants);
    const data = {
      main_image: selectOneImage?.id,
      images: selectImage.map((item: any) => item.id),
      ...val,
      variants:
        typeProduct == "0"
          ? val.variants.map((item: any, index: number) => ({
              ...item,
              values: variants[index]?.nam || [],
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

    console.log("Dữ liệu gửi lên:", data);
    mutate(data);
  };

  const handleChangeType = (values: any) => {
    setTypeProduct(values);
  };
  console.log(variants);
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
        initialValues={{ type: "1" }}
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
            style={{ width: "100%" }}
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

        {typeProduct !== "1" ? (
          <>
            <Form.Item label="Chọn Size" name="sizes">
              <Select
                mode="multiple"
                placeholder="Chọn Size"
                options={sizeOptions}
                onChange={(sizes) =>
                  handleVariantChange(sizes, form.getFieldValue("colors"))
                }
              />
            </Form.Item>

            <Form.Item label="Chọn Màu" name="colors">
              <Select
                placeholder="Chọn Màu"
                mode="multiple"
                options={colorOptions}
                onChange={(colors) =>
                  handleVariantChange(form.getFieldValue("sizes"), colors)
                }
              />
            </Form.Item>

            <Form.List name="variants">
              {(fields, { remove }) => (
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
                      <span>
                        {variants
                          ? `${
                              sizeOptions.find(
                                (s: any) => s.id == variants[index]?.size
                              )?.label || "N/A"
                            } 
                          - ${
                            colorOptions.find(
                              (c: any) => c.id == variants[index]?.color
                            )?.label || "N/A"
                          }`
                          : "N/A"}
                      </span>

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
              {(fields, { add }) => {
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
                      </Space>
                    ))}
                  </>
                );
              }}
            </Form.List>
          </>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductAdd;

import React, { useEffect, useState } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAttributesAll } from "../../../../sevices/attribute";
import { getCategorysAll } from "../../../../sevices/category";

const ProductForm = ({
  selectOneImage,
  selectImage,
  mutateUpdate,
  mutateCreate,
  isLoading,
  dataEdit,
}: any) => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState<any[]>([]);
  const [typeProduct, setTypeProduct] = useState("1");
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [editorContent, setEditorContent] = useState("");
  const { id } = useParams();
  const handleAttributeChange = (selected: any) => {
    setSelectedAttributes(selected);
  };
  const isEditing = !!id;
  useEffect(() => {
    if (id) {
      form.resetFields();
    }
  }, [id]);
  // useEffect(() => {
  //   if (dataEdit) {
  //     if (typeProduct !== dataEdit.type) {
  //       form.resetFields(["variants"]);
  //       setVariants([]);
  //     } else {
  //       form.setFieldsValue({ ...dataEdit });
  //     }
  //   }
  // }, [typeProduct]);

  useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue({
        ...dataEdit,
        type: dataEdit?.type || "1",
      });
    }
  }, [dataEdit]);
  const { data: category }: any = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await getCategorysAll()).data,
  });

  const { data: attrAll }: any = useQuery({
    queryKey: ["attrAll"],
    queryFn: async () => (await getAttributesAll()).data,
  });

  const optionsSelectCategory = category?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  const handleVariantChange = () => {
    const selectedOptions = selectedAttributes.map((attributeId) => {
      const option: any = attrAll?.find((opt: any) => opt.id === attributeId);
      return {
        name: option.name,
        values: form.getFieldValue(option.name) || [],
      };
    });

    const newVariants = selectedOptions.reduce((acc, option) => {
      if (acc.length === 0) {
        return option.values.map((value: any) => ({
          [option.name]: value,
          sku: `${value}-${Date.now()}`,
          nam: [value],
          regular_price: 0,
          sale_price: 0,
          stock_quantity: 0,
        }));
      }

      return acc.flatMap((variant) =>
        option.values.map((value: any) => ({
          ...variant,
          [option.name]: value,
          nam: [...variant.nam, value],
          sku: `${variant.sku}-${value}`,
        }))
      );
    }, [] as any[]);

    setVariants(newVariants);
    form.setFieldsValue({
      variants: newVariants.map((variant) => ({
        regular_price: variant.regular_price,
        stock_quantity: variant.stock_quantity,
        sku: variant.sku,
      })),
    });
  };

  const handleSubmit = (val: any) => {
    const attributesValues: any = {};
    attrAll.forEach((attribute: any) => {
      const selectedValue = val[attribute.name];
      if (selectedValue) {
        const selectedNames = attribute.data
          .filter((attrValue: any) => selectedValue.includes(attrValue.id))
          .map((attrValue: any) => attrValue.id);
        attributesValues[attribute.name] = selectedNames;
      }
    });
    const data = {
      attributes: attributesValues,
      main_image: selectOneImage?.id,
      images: selectImage.map((item: any) => item.id),
      short_description: val.short_description,
      description: isEditing
        ? val.description !== dataEdit.description
          ? val.description?.level?.content
          : val.description
        : val.description?.level?.content,
      type: val.type,
      name: val.name,
      slug: val?.slug,
      categories: val.categories,
      variants:
        typeProduct == "0"
          ? val.variants.map((item: any, index: number) => ({
              ...item,

              values: variants[index]?.nam || [],
            }))
          : [
              {
                variant_id: val.variants?.find((items: any) => items.id)?.id,
                regular_price: val.variants?.[0]?.regular_price || 0,
                sale_price: val.variants?.[0]?.sale_price || 0,
                sku: val.variants?.[0]?.sku || "",
                stock_quantity: val.variants?.[0]?.stock_quantity,
                values: [],
              },
            ],
    };
    if (isEditing) {
      mutateUpdate(data);
    } else {
      mutateCreate(data);
    }
  };

  const handleChangeType = (values: any) => {
    setTypeProduct(values);
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ ...dataEdit }}
      >
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input placeholder="Tên" />
        </Form.Item>

        {isEditing ? (
          <Form.Item name="slug" label="Slug sản phẩm">
            <Input placeholder="Slug" />
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item name="description" label="Mô tả">
          <Editor
            apiKey="n9i6knon4ekgc3nai8h03m23r1gkk89vpd9a0d24ulhvl6p7"
            value={editorContent}
            onEditorChange={setEditorContent}
            init={{
              height: 300,
              menubar: false,
              plugins: ["link", "image", "lists"],
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image",
            }}
          />

          {/* <Input.TextArea placeholder="Mô tả" /> */}
        </Form.Item>

        <Form.Item name="short_description" label="Mô tả ngắn">
          <Input className="w-50" placeholder="Mô tả ngắn" />
        </Form.Item>

        <Form.Item label="Category Id" name="categories">
          <Select
            className="w-50"
            mode="multiple"
            placeholder="Vui lòng chọn"
            options={optionsSelectCategory}
          />
        </Form.Item>

        <Form.Item label="Type" name="type" initialValue="1">
          <Select
            className="w-50"
            onChange={(value) => {
              handleChangeType(value);
              setTypeProduct(value);
            }}
          >
            <Select.Option value={"0"}>Sản phẩm có biến thể</Select.Option>
            <Select.Option value={"1"}>Sản phẩm đơn giản</Select.Option>
          </Select>
        </Form.Item>

        {typeProduct === "0" && (
          <>
            <Form.Item label="Chọn các thuộc tính" name="parentVariants">
              <Select
                mode="multiple"
                placeholder="Chọn thuộc tính"
                options={attrAll?.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChange={handleAttributeChange}
              />
            </Form.Item>

            {selectedAttributes.map((attributeId) => {
              const option: any = attrAll?.find(
                (opt: any) => opt.id === attributeId
              );
              return (
                <Form.Item
                  key={option.name}
                  label={`Chọn ${option.name}`}
                  name={option.name}
                >
                  <Select
                    mode="multiple"
                    placeholder={`Chọn ${option.name}`}
                    options={option.data.map((item: any) => ({
                      label: item.label,
                      value: item.id,
                    }))}
                    onChange={handleVariantChange}
                  />
                </Form.Item>
              );
            })}

            {variants.length > 0 && (
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
                          {selectedAttributes.map((attr) => {
                            const option = attrAll?.find(
                              (o: any) => o.id === attr
                            );
                            const label =
                              option?.data.find(
                                (d: any) => d.id == variants[index][option.name]
                              )?.label || "";
                            return label ? `${label} - ` : "";
                          })}
                        </span>

                        <Form.Item
                          {...restField}
                          name={[name, "regular_price"]}
                        >
                          <InputNumber min={0} placeholder="Giá gốc" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "stock_quantity"]}
                        >
                          <InputNumber min={0} placeholder="Số lượng" />
                        </Form.Item>

                        <Form.Item {...restField} name={[name, "sku"]}>
                          <Input defaultValue={variants[index]?.sku} />
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
            )}
          </>
        )}

        {typeProduct === "1" && (
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
                      <Form.Item {...restField} name={[name, "regular_price"]}>
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

                      <Form.Item {...restField} name={[name, "stock_quantity"]}>
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
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;

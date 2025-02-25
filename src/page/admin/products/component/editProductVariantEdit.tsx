import React, { useState, useEffect } from "react";
import { Select, Input, List, Card, Form, Button, message } from "antd";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  addVariantsProduct,
  editVariantsProduct,
  getVariantsProduct,
  getVariantsProductEdit,
  getVariantsProductList,
} from "../../../../sevices/products";

const { Option } = Select;

const EditProductVariant = () => {
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const { idVariant, idProduct } = useParams();
  const { data: productsVariants }: any = useQuery({
    queryKey: ["productsVariant", idProduct],
    queryFn: async () => {
      const response = await getVariantsProduct(idProduct);
      return response.data;
    },
  });
  const { data: productsVariantsEdit, refetch }: any = useQuery({
    queryKey: ["productsVariantEdit", idProduct, idVariant],
    queryFn: async () => {
      const response = await getVariantsProductEdit(idProduct, idVariant);
      return response.data;
    },
  });
  const { data: productsVariantsList, refetch: refetchVariant }: any = useQuery(
    {
      queryKey: ["productsVariantList", idProduct],
      queryFn: async () => {
        const response = await getVariantsProductList(idProduct);
        return response?.data;
      },
    }
  );
  const { mutate } = useMutation({
    mutationFn: async (values: any) => {
      return await editVariantsProduct(idProduct, idVariant, values);
    },
    onSuccess: () => {
      message.success("Variant created successfully!");
      refetch();
      refetchVariant();
    },
    onError: ({ response }: any) => {
      message.error(response?.data?.message);
    },
  });

  useEffect(() => {
    if (productsVariantsEdit) {
      const initialValues = productsVariantsEdit.values.reduce(
        (acc: any, value: any) => {
          acc[`attribute_${value.attribute_id}`] = value.attribute_value_id;
          return acc;
        },
        {}
      );
      form.setFieldsValue({
        ...productsVariantsEdit,
        ...initialValues,
      });
    }
  }, [productsVariantsEdit, form]);

  const handleSubmit = (val: any) => {
    const data = {
      ...val,
      values: productsVariants?.attributes?.reduce(
        (acc: any, attribute: any) => {
          const selectedValue = val[`attribute_${attribute.id}`];
          if (selectedValue) {
            acc.push({
              id: attribute.id,
              attribute_value_id: selectedValue,
            });
          }
          return acc;
        },
        []
      ),
    };
    mutate(data);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <List
        header={<div>List biến thể đã có</div>}
        bordered
        dataSource={productsVariantsList}
        renderItem={(item: any) => {
          return <List.Item>{item.values.join(" - ")}</List.Item>;
        }}
        style={{ width: "20%" }}
      />
      <Form form={form} onFinish={handleSubmit} style={{ width: "75%" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              {productsVariants?.attributes?.map((items: any) => {
                return (
                  <Form.Item
                    key={items.id}
                    label={items.name}
                    labelCol={{ span: 24 }}
                    name={`attribute_${items.id}`}
                  >
                    <Select
                      placeholder={items.name}
                      style={{
                        width: "60%",
                        display: "block",
                        marginBottom: "10px",
                      }}
                      options={items?.attribute_values?.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    />
                  </Form.Item>
                );
              })}
            </div>
            <Card
              title="Ảnh"
              bordered={false}
              style={{ width: 300, height: 300 }}
            />
          </div>
          <Form.Item
            label="Nhập giá"
            name="regular_price"
            labelCol={{ span: 24 }}
          >
            <Input placeholder="Nhập giá" style={{ marginBottom: "10px" }} />
          </Form.Item>
          <Form.Item label="Giá sale" name="sale_price" labelCol={{ span: 24 }}>
            <Input placeholder="Giá sale" style={{ marginBottom: "10px" }} />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock_quantity"
            labelCol={{ span: 24 }}
          >
            <Input placeholder="Stock" style={{ marginBottom: "10px" }} />
          </Form.Item>
          <Form.Item label="Sku" name="sku" labelCol={{ span: 24 }}>
            <Input placeholder="Sku" style={{ marginBottom: "10px" }} />
          </Form.Item>
          <Form.Item
            label="Variant_image"
            name="variant_image"
            labelCol={{ span: 24 }}
          >
            <Input
              placeholder="Variant_image"
              style={{ marginBottom: "10px" }}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProductVariant;

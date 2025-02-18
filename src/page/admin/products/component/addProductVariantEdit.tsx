import React, { useState } from "react";
import { Select, Input, List, Card, Form, Button, message } from "antd";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  addVariantsProduct,
  getVariantsProduct,
  getVariantsProductList,
} from "../../../../sevices/products";

const { Option } = Select;

const AddProductVariantEdit = () => {
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: productsVariants, refetch }: any = useQuery({
    queryKey: ["productsVariant", id],
    queryFn: async () => {
      const response = await getVariantsProduct(id);
      return response.data;
    },
  });

  const { data: productsVariantsList, refetch: refetchVariant }: any = useQuery(
    {
      queryKey: ["productsVariantList", id],
      queryFn: async () => {
        const response = await getVariantsProductList(id);
        return response?.data;
      },
    }
  );
  const { mutate } = useMutation({
    mutationFn: async (values: any) => {
      return await addVariantsProduct(id, values);
    },
    onSuccess: () => {
      message.success("Variant created successfully!");
      refetch();
      refetchVariant();
    },
    onError: () => {
      message.error("Variant created failure!");
    },
  });

  const handleSubmit = (val: any) => {
    const data = {
      ...val,
      values: productsVariants?.attributes?.reduce(
        (acc: any, attribute: any) => {
          const selectedValue = val[attribute.name];
          if (selectedValue) {
            const attrValue = attribute.attribute_values.find(
              (val: any) => val.id === selectedValue
            );
            acc.push(attrValue ? attrValue.id : null);
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
          const [color, size] = item.values;
          return <List.Item>{color + " " + size}</List.Item>;
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
                  <>
                    <Form.Item
                      label={items.name}
                      labelCol={{ span: 24 }}
                      name={items.name}
                    >
                      <Select
                        placeholder={items.name}
                        style={{
                          width: "60%",
                          display: "block",
                          marginBottom: "10px",
                        }}
                        options={items?.attribute_values?.map((item: any) => {
                          return {
                            value: item.id,
                            label: item.name,
                          };
                        })}
                      ></Select>
                    </Form.Item>
                  </>
                );
              })}
            </div>
            <Card
              title="Ảnh"
              bordered={false}
              style={{ width: 300, height: 300 }}
            ></Card>
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

export default AddProductVariantEdit;

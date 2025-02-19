import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Select } from "antd";
import { useQuery } from "react-query";
import { getAttributesAll } from "../../../../sevices/attribute";

const AttributeForm = ({ data }: { data: any }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);

  const { data: attrAll } = useQuery({
    queryKey: ["attrAll"],
    queryFn: async () => (await getAttributesAll()).data,
  });

  useEffect(() => {
    if (attrAll && data) {
      const selected = data.attributes.map((attr: any) => attr.id);
      setSelectedAttributes(selected);

      const initialValues: any = {};
      data.attributes.forEach((attr: any) => {
        initialValues[`selected_${attr.name}`] = attr.attribute_values.map(
          (val: any) => val.id
        );
      });

      form.setFieldsValue({
        parentVariants: selected,
        ...initialValues,
      });
    }
  }, [attrAll, data, form]);

  const handleAttributeChange = (selectedValues: any) => {
    setSelectedAttributes(selectedValues);
  };

  const handleSubmit = (val: any) => {
    const data = {
      atribute: val,
      parentVariants: val.parentVariants,
    };
    console.log(data);
  };

  if (!attrAll) return <div>Loading...</div>;

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm thuộc tính mới
      </Button>
      <Modal
        width={800}
        title="Thêm thuộc tính mới"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleSubmit}>
          <h3 className="mt-3">Thuộc tính</h3>

          {/* Chọn thuộc tính cha */}
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
            const option = attrAll?.find((opt: any) => opt.id === attributeId);
            if (!option) return null;

            return (
              <Form.Item
                key={option.id}
                label={`Chọn ${option.name}`}
                name={`selected_${option.name}`}
              >
                <Select
                  mode="multiple"
                  placeholder={`Chọn ${option.name}`}
                  options={option.data.map((item: any) => ({
                    label: item.label,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
};

const productData = {
  product_id: "1",
  attributes: [
    {
      id: 1,
      name: "Màu sắc",
      attribute_values: [{ id: 1, name: "Màu đỏ" }],
    },
    {
      id: 2,
      name: "Kích thước",
      attribute_values: [
        { id: 7, name: "36" },
        { id: 8, name: "37" },
      ],
    },
  ],
};

export default function App() {
  return <AttributeForm data={productData} />;
}

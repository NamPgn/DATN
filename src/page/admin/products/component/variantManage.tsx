import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addAttributeVariant,
  deleteAttributeVariant,
  getAttributesAll,
  getAttributesProduct,
} from "../../../../sevices/attribute";

const AttributeForm = ({ idProduct }: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const { data: attrAll } = useQuery({
    queryKey: ["attrAll"],
    queryFn: async () => (await getAttributesAll()).data,
  });
  const { data: attribute, refetch }: any = useQuery({
    queryKey: ["attributeVariant", idProduct],
    queryFn: async () => (await getAttributesProduct(idProduct)).data,
  });
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      return await deleteAttributeVariant(id);
    },
    onSuccess: () => {
      message.success("Variant delete successfully!");
      queryClient.invalidateQueries("attrAll");
    },
    onError: ({ response }: any) => {
      message.error(response?.data?.message);
    },
  });
  const { mutate: MUTATE_PRODUCTVARIANT } = useMutation({
    mutationFn: async (data) => {
      return await addAttributeVariant(data);
    },
    onSuccess: () => {
      message.success("Variant created successfully!");
      refetch();
      queryClient.invalidateQueries("attrAll");
    },
    onError: ({ response }: any) => {
      message.error(response?.data?.message);
    },
  });
  useEffect(() => {
    if (attrAll) {
      const selected = attribute?.attributes?.map((attr: any) => attr.id);
      setSelectedAttributes(selected);

      const initialValues: any = {};
      attribute?.attributes?.forEach((attr: any) => {
        initialValues[`selected_${attr.name}`] = attr.attribute_values.map(
          (val: any) => val.id
        );
      });

      form.setFieldsValue({
        parentVariants: selected,
        ...initialValues,
      });
    }
  }, [form, attribute]);

  const handleAttributeChange = (selectedValues: any) => {
    setSelectedAttributes(selectedValues);
  };

  const handleSubmit = (val: any) => {
    const data: any = {
      id: idProduct,
      attribute: val,
      parentVariants: val.parentVariants,
    };
    MUTATE_PRODUCTVARIANT(data);
  };

  const handleDelete = (removedValue: any) => {
    mutate(removedValue);
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

          <Form.Item label="Chọn các thuộc tính" name="parentVariants">
            <Select
              mode="multiple"
              placeholder="Chọn thuộc tính"
              options={attrAll?.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
              value={selectedAttributes}
              onChange={(newValues) => {
                const removedValues = selectedAttributes.filter(
                  (val) => !newValues.includes(val)
                );
                removedValues.forEach((removedValue) =>
                  handleDelete(removedValue)
                );
                setSelectedAttributes(newValues);
              }}
            />
          </Form.Item>

          {selectedAttributes?.map((attributeId) => {
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

export default AttributeForm;

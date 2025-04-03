import { Form, Input, Button, message, Select } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getCategory,
  updateCategory,
} from "../../../sevices/category";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";

const EditCategory = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [findById, setFindById]: any = useState({});
  useEffect(() => {
    (async () => {
      const resCategory = (await getCategory(id)).data;
      setFindById(resCategory);
      form.setFieldsValue(resCategory.categoryConvert);
    })();
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await updateCategory(id, values);
    },
    onSuccess: () => {
      message.success("Category created successfully!");
      setTimeout(() => {
        navigate("/dashboard/category");
      }, 800);
    },
    onError: () => {
      message.error("Category created failure!");
    },
  });
  const handleSubmit = (values: any) => {
    mutate(values);
  };
  const optionsSelectCategory = findById.parentCategories?.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  optionsSelectCategory?.unshift({ label: "Trống", value: null });
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={findById}
    >
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          { required: true, message: "Please enter the category name!" },
          { max: 50, message: "Category name cannot exceed 50 characters!" },
        ]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>
      <Form.Item label="Slug Name" name="slug">
        <Input placeholder="Enter slug name" />
      </Form.Item>
      <Form.Item label="Danh mục" name="parent_id">
        <Select
          style={{ width: "200px" }}
          placeholder="Vui lòng chọn"
          options={optionsSelectCategory}
        />
      </Form.Item>
      {/* Submit Button */}
      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
          block
        >
          Update Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCategory;

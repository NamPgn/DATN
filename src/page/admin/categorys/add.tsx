import { Form, Input, Button, message, Select } from "antd";
import { addCategory } from "../../../sevices/category";
import { useMutation } from "react-query";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (values) => {
      return await addCategory(values);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const { data: categoryFather }: any = useQuery({
  //   queryKey: ["categoriesFather"],
  //   queryFn: async () => (await getCategorysFather()).data,
  // });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    mutate(values);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const optionsSelectCategory = categoryFather?.map((item: any) => ({
  //   label: item.name,
  //   value: item.id,
  // }));

  // optionsSelectCategory?.unshift({ label: "Trống", value: null });

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
      <Form.Item label="Danh mục" name="parent_id">
        <Select
          style={{ width: "200px" }}
          placeholder="Vui lòng chọn"
          // options={optionsSelectCategory || []}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          loading={isLoading ?? <SyncOutlined spin />}
          htmlType="submit"
          block
        >
          Create Category
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;

import { Form, Input, Button, Card, Select } from "antd";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { addUser } from "../../../../sevices/users";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const AddUser = () => {
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await addUser(data);
    },
    onSuccess: ({ data }) => {
      toast.success(data?.message);
    },
    onError: ({ response }) => {
      toast.error(response?.data?.message);
    },
  });
  const onFinish = (values: any) => {
    const data = {
      ...values,
    };
    mutate(data);
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card
        title="Create Account"
        bordered={false}
        style={{ width: "400px" }}
        className=""
      >
        <Form
          name="normal_login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Xin vui lòng nhập Name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Xin vui lòng nhập Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Xin vui lòng nhập Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Xin vui lòng nhập Password!",
              },
              {
                min: 8,
                message: "Password tối thiểu 8 ký tự",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            hasFeedback
            dependencies={["password"]}
            rules={[
              {
                required: true,

                message: "Xin vui lòng nhập Password!",
              },
              {
                min: 8,
                message: "Password tối thiểu 8 ký tự",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error("Mật Khẩu Không Khớp!"));
                  }
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item label="Role" name="role">
            <Select placeholder="Select Role">
              <Select.Option value={"member"}>Member</Select.Option>
              <Select.Option value={"admin"}>Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddUser;

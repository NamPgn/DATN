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
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Card
          title="Tạo tài khoản"
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
              rules={[
                { required: true, message: "Xin vui lòng nhập Họ và Tên!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Họ và Tên" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Xin vui lòng nhập Tên đăng nhập!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
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
                  message: "Xin vui lòng nhập Mật khẩu!",
                },
                {
                  min: 8,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item
              name="password_confirmation"
              hasFeedback
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Xin vui lòng nhập lại Mật khẩu!",
                },
                {
                  min: 8,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    }
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
              />
            </Form.Item>
            <Form.Item label="Quyền" name="role">
              <Select placeholder="Chọn quyền">
                <Select.Option value={"member"}>Thành viên</Select.Option>
                <Select.Option value={"admin"}>Quản trị viên</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo tài khoản
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddUser;

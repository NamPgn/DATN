import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { register } from "../../../sevices/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'ionicons';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Register() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const styles: any = {
    section: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: '#F5F5F5',
    },
    formContainer: {
        margin: token.marginLG,
        padding: screens.md ? `${token.sizeXXL}px` : `${token.padding}px`,
        backgroundColor: '#FFF',
        borderRadius: '8px', // Tuỳ chỉnh bo góc nếu cần
        boxShadow: '0 4px 50px rgba(0,0,0,.15)', // Tạo bóng cho container
        width: '100%',
        maxWidth: '500px',
    },
    title: {
      textAlign: "center",
      marginBottom: token.marginXL,
    },
    text: {
      color: token.colorTextSecondary,
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
  };
  const { mutate } = useMutation({
    mutationFn: async (data: string) => {
      return await register(data);
    },
    onSuccess: ({ data }) => {
      toast.success(data?.message, {
        position: "top-center",
      });
      navigate("/auth/login");
    },
    onError: ({ response }) => {
      toast.error(response?.data?.message);
    },
  });

  const onFinish = (val: any) => {
    mutate(val);
  };

  return (
    <section style={styles.section}>
      <div className="animation" style={styles.formContainer}>
        <div style={styles.formContent}>
          <div style={styles.title}>
            <div style={styles.iconText}>
              <Title level={2} style={{ margin: 0, fontSize: "40px" }}>
                ĐĂNG KÝ
              </Title>
            </div>
          </div>
          <Form
            name="normal_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên đầy đủ!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Họ và tên" style={{ fontSize: '16px' }} />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Tên đăng nhập không được bỏ trống!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" style={{ fontSize: '16px' }} />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Hãy nhập email của bạn!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-mail" style={{ fontSize: '16px' }} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mật khẩu!",
                },
                {
                  min: 8,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                style={{ fontSize: '16px' }}
              />
            </Form.Item>
            <Form.Item
              name="password_confirmation"
              hasFeedback
              dependencies={["password"]}
              rules={[
                {
                  required: true,

                  message: "Vui lòng xác nhận mật khẩu!",
                },
                {
                  min: 8,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
                    }
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Xác nhận mật khẩu"
                style={{ fontSize: '16px' }}
              />
            </Form.Item>
            <Form.Item style={{marginTop: '40px'}}>
              <Button block type="primary" htmlType="submit"
                style={{ paddingTop: '20px', paddingBottom: '22px', fontSize: '16px', fontWeight: 'bold'}}>
                Đăng ký
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Bạn đã có tài khoản?</Text>
                <Link className="hover-underline" style={{ color: 'red', fontWeight: 'bold', marginLeft: '6px' }} href="/auth/login">Đăng nhập</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div style={styles.imageContainer}></div>
    </section>
  );
}

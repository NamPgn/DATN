import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { login } from "../../../sevices/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../../context/usersContext";
import "ionicons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
  const { token } = useToken();
  const { setIslogin }: any = useContext(UsersContext) || {};
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const styles: any = {
    section: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#F5F5F5",
      //   background: "url('/assets/images/bg/login.jpg') center/cover no-repeat",
    },
    formContainer: {
      margin: token.marginLG,
      padding: screens.md ? `${token.sizeXXL}px` : `${token.padding}px`,
      backgroundColor: "#FFF",
      borderRadius: "8px", // Tuỳ chỉnh bo góc nếu cần
      boxShadow: "0 4px 50px rgba(0,0,0,.15)", // Tạo bóng cho container
      width: "100%",
      maxWidth: "500px", // Đảm bảo form không quá rộng
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
      return await login(data);
    },
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      localStorage.setItem("token", JSON.stringify(data));
      navigate("/");
      setIslogin(true);
      localStorage.setItem("isLogin", "1");
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
            <Title level={2} style={{ margin: 0, fontSize: "40px" }}>
              ĐĂNG NHẬP
            </Title>
          </div>
          <Form
            name="normal_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Tên đăng nhập"
                style={{ fontSize: "16px" }} // Ghi đè kích thước font tại đây
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                {
                  min: 8,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                style={{ fontSize: "16px" }} // Ghi đè kích thước font tại đây
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "-12px" }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
              </Form.Item>
              <Link
                className="hover-underline"
                style={styles.forgotPassword}
                href="/auth/forgot-password"
              >
                Quên mật khẩu?
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                style={{
                  paddingTop: "20px",
                  paddingBottom: "22px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Đăng nhập
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Bạn không có tài khoản?</Text>
                <Link
                  className="hover-underline"
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginLeft: "6px",
                  }}
                  href="/auth/register"
                >
                  Đăng ký
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div style={styles.imageContainer}></div>
    </section>
  );
}

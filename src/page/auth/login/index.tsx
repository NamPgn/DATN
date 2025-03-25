/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { login, loginGoogle } from "../../../sevices/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../../context/usersContext";
import { useCart } from "../../../context/Cart/cartContext";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { cartSync } from "../../../sevices/client/cart";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
  const { token } = useToken();
  const { setIslogin }: any = useContext(UsersContext) || {};
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { cart }: any = useCart();

  const styles: any = {
    logo: {
      width: "100px",
      objectFit: "cover",
    },
    section: {
      display: "flex",
      height: "100vh",
      backgroundColor: token.colorBgContainer,
    },
    imageContainer: {
      flex: "60%",
      background: "url('/assets/images/slider/3.jpg') center/cover no-repeat",
    },
    formContainer: {
      flex: "40%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: screens.md ? `${token.sizeXXL}px` : `${token.padding}px`,
    },
    formContent: {
      width: "100%",
      maxWidth: "380px",
    },
    header: {
      textAlign: "center",
      marginBottom: token.marginXL,
    },
    iconText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
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
  const { mutate: syncCart } = useMutation({
    mutationFn: async (data: any) => {
      return await cartSync(data);
    },
  });
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
      const cartData = cart?.map((item: any) => ({
        variation_id: item.variant_id,
        quantity: item.quantity,
      }));
      syncCart({
        cart: cartData,
      });
      localStorage.removeItem("cart");
    },
    onError: ({ response }) => {
      toast.error(response?.data?.message);
    },
  });

  const onFinish = (val: any) => {
    mutate(val);
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const res = await loginGoogle({
        token: response.credential,
      });
      localStorage.setItem("token", JSON.stringify(res?.data));
      setIslogin(true);
      localStorage.setItem("isLogin", "1");
      toast.success("Đăng nhập thành công!");
      const cartData = cart?.map((item: any) => ({
        variation_id: item.variant_id,
        quantity: item.quantity,
      }));
      syncCart({
        cart: cartData,
      });
      localStorage.removeItem("cart");
      navigate("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại!");
    }
  };
  const handleGoogleLoginFailure = () => {
    toast.error("Google Login Failed!");
  };
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <section style={styles.section}>
        <div style={styles.formContainer}>
          <div style={styles.formContent}>
            <div style={styles.header}>
              <div style={styles.iconText}>
                <img style={styles.logo} src="/assets/images/logo.png" alt="" />
                <Title level={2} style={{ margin: 0 }}>
                  Sign in
                </Title>
              </div>
              <Text style={styles.text}>
                Welcome back to AntBlocks UI! Please enter your details below to
                sign in.
              </Text>
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
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                  { min: 8, message: "Password tối thiểu 8 ký tự" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link
                  style={styles.forgotPassword}
                  href="/auth/forgot-password"
                >
                  Forgot password?
                </Link>
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit" className="mb-2">
                  Log in
                </Button>
                <GoogleLogin
                  size="medium"
                  text="signin_with"
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                />
                <div style={styles.footer}>
                  <Text style={styles.text}>Don't have an account?</Text>{" "}
                  <Link href="/auth/register">Sign up now</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div style={styles.imageContainer}></div>
      </section>
    </GoogleOAuthProvider>
  );
}
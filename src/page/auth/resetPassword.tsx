/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendEmailForgotPass, sendResetPS } from "../../sevices/users";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function ResetPassword() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [searchParams] = useSearchParams();
  const tokenReset = searchParams.get("token");
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
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (data: string) => {
      return await sendResetPS(data);
    },
    onSuccess: ({ data }) => {
      toast.success(data?.message, {
        position: "top-center",
      });
      nav("/auth/login");
    },
    onError: ({ response }) => {
      toast.error(response?.data?.message);
    },
  });

  const onFinish = (val: any) => {
    const data = {
      token: tokenReset,
      ...val,
    };
    mutate(data);
  };

  return (
    <section style={styles.section}>
      <div style={styles.formContainer}>
        <div style={styles.formContent}>
          <div style={styles.header}>
            <div style={styles.iconText}>
              <img style={styles.logo} src="/assets/images/logo.png" alt="" />
              <Title level={2} style={{ margin: 0 }}>
                Reset Password
              </Title>
            </div>
            <Text style={styles.text}>
              Welcome back to AntBlocks UI! Please enter your details below to
              Reset Password.
            </Text>
          </div>
          <Form
            name="normal_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
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
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
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
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Send Email
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Do have an account?</Text>{" "}
                <Link href="/auth/login">Login now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div style={styles.imageContainer}></div>
    </section>
  );
}
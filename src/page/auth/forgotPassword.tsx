/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { sendEmailForgotPass } from "../../sevices/users";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function ForgotPassword() {
  const { token } = useToken();
  const screens = useBreakpoint();
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
  const { mutate } = useMutation({
    mutationFn: async (data: string) => {
      return await sendEmailForgotPass(data);
    },
    onSuccess: ({ data }) => {
      toast.success(data?.message, {
        position: "top-center",
      });
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
      <div style={styles.formContainer}>
        <div style={styles.formContent}>
          <div style={styles.header}>
            <div style={styles.iconText}>
              <img style={styles.logo} src="/assets/images/logo.png" alt="" />
              <Title level={2} style={{ margin: 0 }}>
                Forgot Password
              </Title>
            </div>
            <Text style={styles.text}>
              Welcome back to AntBlocks UI! Please enter your details below to
              Forgot Password.
            </Text>
          </div>
          <Form
            name="normal_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
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
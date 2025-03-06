/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { sendEmailForgotPass } from "../../sevices/users";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function ForgotPassword() {
  const { token } = useToken();
  const screens = useBreakpoint();
  //   const navigate = useNavigate();
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
      <div className="animation" style={styles.formContainer}>
        <div style={styles.formContent}>
          <div style={styles.title}>
            <Title
              level={2}
              style={{ marginBottom: 0, fontSize: "40px" }}
            >
              ĐẶT LẠI MẬT KHẨU
            </Title>
          </div>
          <Form
            name="normal_login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <p style={{marginBottom: "10px"}}>
            Chúng tôi sẽ gửi cho bạn một email để giúp bạn đặt lại mật khẩu
            </p>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "E-mail chưa chính xác!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                style={{ fontSize: "16px" }} // Ghi đè kích thước font tại đây
              />
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
                Gửi email
              </Button>
              <div style={styles.footer}>
                <Link
                  className="hover-underline"
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginLeft: "6px",
                  }}
                  href="/auth/login"
                >
                  Hủy bỏ
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

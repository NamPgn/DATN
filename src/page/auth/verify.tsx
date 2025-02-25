import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Card } from "antd";

const VerifyPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="text-center p-4 shadow-lg">
        <CheckCircleFilled className="text-success display-1" />
        <h2 className="mt-3 fw-bold text-dark">Xác thực thành công!</h2>
        <p className="text-muted">Tài khoản của bạn đã được xác thực.</p>
        <Button type="primary" href="/" className="mt-3">
          Quay về trang chủ
        </Button>
      </Card>
    </div>
  );
};

export default VerifyPage;

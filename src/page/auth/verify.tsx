import { CheckCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useQuery } from "react-query";
import { getVerify } from "../../sevices/users";
import { useSearchParams } from "react-router-dom";
const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { data }: any = useQuery({
    queryFn: async () => {
      return (await getVerify(token)).data;
    },
  });

  switch (data?.code) {
    case 200:
      return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <Card className="text-center p-4 shadow-lg">
            <CheckCircleFilled className="text-success display-1" />
            <h2 className="mt-3 fw-bold text-dark">Xác thực thành công!</h2>
            <p className="text-muted">{data.message}</p>
            <Button type="primary" href="/" className="mt-3">
              Quay về trang chủ
            </Button>
          </Card>
        </div>
      );
      break;
    case 400:
      return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <Card className="text-center p-4 shadow-lg">
            <CloseCircleOutlined className="text-error display-1" />
            <h2 className="mt-3 fw-bold text-dark">Xác thực email thất bại!</h2>
            <p className="text-muted">{data.message}</p>
            <Button type="primary" danger href="/" className="mt-3">
              Quay về trang chủ
            </Button>
          </Card>
        </div>
      );
      break;
    case 401:
      return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <Card className="text-center p-4 shadow-lg">
            <CloseCircleOutlined className="text-error display-1" />
            <h2 className="mt-3 fw-bold text-dark">Xác thực email thất bại!</h2>
            <p className="text-muted">{data.message}</p>
            <Button type="primary" danger href="/" className="mt-3">
              Quay về trang chủ
            </Button>
          </Card>
        </div>
      );
      break;
    case 401:
      return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <Card className="text-center p-4 shadow-lg">
            <CloseCircleOutlined className="text-success display-1" />
            <h2 className="mt-3 fw-bold text-dark">Xác thực email thất bại!</h2>
            <p className="text-muted">{data.message}</p>
            <Button type="primary" danger href="/" className="mt-3">
              Quay về trang chủ
            </Button>
          </Card>
        </div>
      );
      break;

    default:
      break;
  }
};

export default VerifyPage;

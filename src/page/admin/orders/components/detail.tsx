import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Spin } from "antd";
import { getOrder } from "../../../../sevices/orders";

const OrdersDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["order", id], () => getOrder(id!));
  if (isLoading) {
    return <Spin />;
  }
  const order = data?.data?.data;
  return (
    <Card title={`Orders code: ${order?.code}`} bordered={false}>
      {Object.entries(order).map(([key, value]) => {
        return (
          <p key={key}>
            <strong>{key}:</strong> {String(value)}
          </p>
        );
      })}
    </Card>
  );
};

export default OrdersDetail;

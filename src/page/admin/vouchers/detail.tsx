import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Spin } from "antd";
import { getVoucher } from "../../../sevices/voucher";

const VoucherDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["voucher", id], () => getVoucher(id!));

  if (isLoading) {
    return <Spin />;
  }

  const voucher = data?.data;

  return (
    <Card title={`Voucher: ${voucher?.id}`} bordered={false}>
      <p>
        <strong>Code:</strong> {voucher?.code}
      </p>
      <p>
        <strong>Name:</strong> {voucher?.name}
      </p>

      <p>
        <strong>Description:</strong> {voucher?.description}
      </p>
      <p>
        <strong>Discount Percent:</strong> {voucher?.discount_percent || "N/A"}
      </p>
      <p>
        <strong>Max Discount Amount:</strong> {voucher?.max_discount_amount}
      </p>
      <p>
        <strong>Type:</strong> {voucher?.type}
      </p>
      <p>
        <strong>Min Product Price:</strong> {voucher?.min_product_price}
      </p>
      <p>
        <strong>Amount:</strong> {voucher?.amount}
      </p>
      <p>
        <strong>Start Date:</strong> {voucher?.start_date}
      </p>
      <p>
        <strong>Expiry Date:</strong> {voucher?.expiry_date}
      </p>
      <p>
        <strong>Usage Limit:</strong> {voucher?.usage_limit}
      </p>
      <p>
        <strong>Times Used:</strong> {voucher?.times_used}
      </p>
    </Card>
  );
};

export default VoucherDetail;

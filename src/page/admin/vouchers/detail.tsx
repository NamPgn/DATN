import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Spin } from "antd";
import { getVoucher } from "../../../sevices/voucher";
import { MyButton } from "../../../components/UI/Core/Button";

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
        <strong>Mã Voucher:</strong> {voucher?.code}
      </p>
      <p>
        <strong>Tên Voucher:</strong> {voucher?.name}
      </p>
      <p>
        <strong>Mô tả:</strong> {voucher?.description}
      </p>
      {voucher?.amount && (
        <p>
          <strong>Số tiền giảm:</strong> {voucher?.amount}
        </p>
      )}
      {!voucher?.amount && (
        <>
          <p>
            <strong>Phần trăm giảm:</strong> {voucher?.discount_percent}
          </p>
          <p>
            <strong>Số tiền giảm tối đa của đơn hàng:</strong>
            {voucher?.max_discount_amount}
          </p>
        </>
      )}

      <p>
        <strong>Loại Giảm Giá:</strong>{" "}
        {voucher?.type === 0 ? "Giảm theo số tiền" : "Giảm theo phần trăm"}
      </p>
      <p>
        <strong>Giá tối thiểu của đơn hàng:</strong>
        {voucher?.min_product_price}
      </p>
      <p>
        <strong>Loại Voucher:</strong>{" "}
        {voucher?.for_logged_in_users === 1
          ? "Chỉ dành cho người dùng đã đăng nhập"
          : "Mọi người đều có thể sử dụng"}
      </p>
      <p>
        <strong>Ngày tạo:</strong> {voucher?.start_date}
      </p>
      <p>
        <strong>Ngày hết hạn:</strong> {voucher?.expiry_date}
      </p>
      <p>
        <strong>Số lượng Voucher:</strong> {voucher?.usage_limit}
      </p>
      <p>
        <strong>Số lượt đã sử dụng:</strong> {voucher?.times_used}
      </p>
      <div className="">
        <Link to="/dashboard/vouchers/">
          <MyButton type="primary">Quay lại danh sách vouchers</MyButton>
        </Link>
      </div>
    </Card>
  );
};

export default VoucherDetail;

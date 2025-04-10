/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";

interface VoucherDetailModalProps {
  visible: boolean;
  onClose: () => void;
  voucher: any;
}

const VoucherDetailModal = ({
  visible,
  onClose,
  voucher,
}: VoucherDetailModalProps) => {
  if (!voucher) return null;

  return (
    <Modal
      title={`Chi tiết Voucher: ${voucher?.code}`}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <p>
          <strong>Mã Voucher:</strong> {voucher?.code}
        </p>
        <p>
          <strong>Tên Voucher:</strong> {voucher?.name}
        </p>
        <p>
          <strong>Mô tả:</strong> {voucher?.description}
        </p>
        {voucher?.amount ? (
          <p>
            <strong>Số tiền giảm:</strong> {voucher?.amount}
          </p>
        ) : (
          <>
            <p>
              <strong>Phần trăm giảm:</strong> {voucher?.discount_percent}
            </p>
            <p>
              <strong>Giảm tối đa:</strong> {voucher?.max_discount_amount}
            </p>
          </>
        )}
        <p>
          <strong>Loại giảm:</strong>{" "}
          {voucher?.type === 0 ? "Giảm theo số tiền" : "Giảm theo phần trăm"}
        </p>
        <p>
          <strong>Giá tối thiểu:</strong> {voucher?.min_product_price}
        </p>
        <p>
          <strong>Loại người dùng:</strong>{" "}
          {voucher?.for_logged_in_users === 0
            ? "Đăng nhập"
            : "Ai cũng dùng được"}
        </p>
        <p>
          <strong>Ngày tạo:</strong> {voucher?.start_date}
        </p>
        <p>
          <strong>Hết hạn:</strong> {voucher?.expiry_date}
        </p>
        <p>
          <strong>Giới hạn sử dụng:</strong> {voucher?.usage_limit}
        </p>
        <p>
          <strong>Đã sử dụng:</strong> {voucher?.times_used}
        </p>
      </div>
    </Modal>
  );
};

export default VoucherDetailModal;

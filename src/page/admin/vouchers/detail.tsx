/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Descriptions, Tag, Divider, Typography } from "antd";
import { formatCurrency } from "../../../sevices/formatCurrency";
import dayjs from "dayjs";

const { Title } = Typography;

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
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết Voucher: <Tag color="blue">{voucher?.code}</Tag>
        </Title>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      className="voucher-detail-modal"
    >
      <div className="p-4">
        <Descriptions
          bordered
          column={1}
          labelStyle={{
            width: "180px",
            fontWeight: 600,
            backgroundColor: "#fafafa",
          }}
          contentStyle={{
            backgroundColor: "#fff",
          }}
        >
          <Descriptions.Item label="Tên Voucher">
            <span className="font-medium">{voucher?.name}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả">
            <span className="text-gray-600">
              {voucher?.description || "Không có mô tả"}
            </span>
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">
          <span className="text-gray-600">Thông tin giảm giá</span>
        </Divider>

        <Descriptions
          bordered
          column={1}
          labelStyle={{
            width: "180px",
            fontWeight: 600,
            backgroundColor: "#fafafa",
          }}
          contentStyle={{
            backgroundColor: "#fff",
          }}
        >
          <Descriptions.Item label="Loại giảm giá">
            <Tag color={voucher?.type === 0 ? "green" : "blue"}>
              {voucher?.type === 0
                ? "Giảm theo số tiền"
                : "Giảm theo phần trăm"}
            </Tag>
          </Descriptions.Item>

          {voucher?.amount ? (
            <Descriptions.Item label="Số tiền giảm">
              <span className="text-red-500 font-semibold">
                {formatCurrency(voucher?.amount)}
              </span>
            </Descriptions.Item>
          ) : (
            <>
              <Descriptions.Item label="Phần trăm giảm">
                <Tag color="red">{voucher?.discount_percent}%</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Giảm tối đa">
                <span className="text-red-500 font-semibold">
                  {formatCurrency(voucher?.max_discount_amount)}
                </span>
              </Descriptions.Item>
            </>
          )}

          <Descriptions.Item label="Giá tối thiểu">
            <span className="text-green-500 font-semibold">
              {formatCurrency(voucher?.min_product_price)}
            </span>
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">
          <span className="text-gray-600">Điều kiện sử dụng</span>
        </Divider>

        <Descriptions
          bordered
          column={1}
          labelStyle={{
            width: "180px",
            fontWeight: 600,
            backgroundColor: "#fafafa",
          }}
          contentStyle={{
            backgroundColor: "#fff",
          }}
        >
          <Descriptions.Item label="Đối tượng sử dụng">
            <Tag color={voucher?.for_logged_in_users === 0 ? "orange" : "cyan"}>
              {voucher?.for_logged_in_users === 0
                ? "Chỉ người dùng đã đăng nhập"
                : "Tất cả người dùng"}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian hiệu lực">
            <div className="flex items-center gap-2">
              <Tag color="blue">
                {dayjs(voucher?.start_date).format("DD/MM/YYYY")}
              </Tag>
              <span className="text-gray-500 mx-2">đến</span>
              <Tag color="red">
                {dayjs(voucher?.expiry_date).format("DD/MM/YYYY")}
              </Tag>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Số lượng">
            <div className="flex items-center gap-4">
              <Tag color="blue">Tổng: {voucher?.usage_limit}</Tag>
              <Tag className="mx-2" color="orange">
                Đã dùng: {voucher?.times_used}
              </Tag>
              <Tag color="green">
                Còn lại: {voucher?.usage_limit - voucher?.times_used}
              </Tag>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái">
            {dayjs().isBefore(dayjs(voucher?.expiry_date)) ? (
              <Tag color="success">Còn hiệu lực</Tag>
            ) : (
              <Tag color="error">Hết hạn</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

// Thêm styles cho modal
const styles = `
  .voucher-detail-modal .ant-modal-content {
    border-radius: 8px;
    overflow: hidden;
  }

  .voucher-detail-modal .ant-descriptions-bordered {
    background: white;
    border-radius: 8px;
  }

  .voucher-detail-modal .ant-descriptions-bordered .ant-descriptions-item-label {
    background-color: #fafafa;
    width: 180px;
  }

  .voucher-detail-modal .ant-descriptions-bordered .ant-descriptions-item-content {
    background-color: #ffffff;
  }

  .voucher-detail-modal .ant-divider {
    margin: 24px 0 16px;
  }

  .voucher-detail-modal .ant-tag {
    margin-right: 0;
    padding: 4px 8px;
  }
  
  .voucher-detail-modal .ant-descriptions-item-container {
    align-items: center;
  }
`;

// Thêm styles vào document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default VoucherDetailModal;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Card,
  Divider,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { updateVoucher } from "../../../sevices/voucher";
import moment from "moment";
import { useQueryClient } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditVoucher = ({ voucher, refetch }: any) => {
  const [form] = Form.useForm();
  const prevVoucherRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const [startDate, setStartDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());

  useEffect(() => {
    if (voucher && voucher !== prevVoucherRef.current) {
      prevVoucherRef.current = voucher;
      form.setFieldsValue({
        ...voucher,
      });
      setStartDate(moment(voucher.start_date).toDate());
      setExpiryDate(moment(voucher.expiry_date).toDate());
    }
  }, [voucher, form]);

  const onFinish = async (values: any) => {
    try {
      const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, value]) => value !== undefined && value !== null
        )
      );

      const data = {
        ...cleanedValues,
        start_date: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
        expiry_date: moment(expiryDate).format("YYYY-MM-DD HH:mm:ss"),
      };

      await updateVoucher(data, Number(voucher.id));
      message.success("Cập nhật Voucher thành công");
      refetch();
      queryClient.invalidateQueries(["VOUCHERCL"]);
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <Card title="" className="max-w-3xl mx-auto">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="code"
            label="Mã Voucher"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên Voucher"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nhập tên voucher" />
          </Form.Item>
        </div>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea
            placeholder="Nhập mô tả..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Divider />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Loại giảm giá" name="type">
            <Select>
              <Select.Option value={0}>Giảm theo số tiền</Select.Option>
              <Select.Option value={1}>Giảm theo phần trăm</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const type = getFieldValue("type");
              return type === 0 ? (
                <Form.Item name="amount" label="Số tiền giảm">
                  <InputNumber className="w-full" />
                </Form.Item>
              ) : type === 1 ? (
                <>
                  <Form.Item name="discount_percent" label="Phần trăm giảm">
                    <InputNumber className="w-full" min={0} max={100} />
                  </Form.Item>
                  <Form.Item
                    name="max_discount_amount"
                    label="Số tiền giảm tối đa"
                  >
                    <InputNumber className="w-full" />
                  </Form.Item>
                </>
              ) : null;
            }}
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="min_product_price"
            label="Giá tối thiểu của đơn hàng"
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item label="Loại Voucher" name="for_logged_in_users">
            <Select>
              <Select.Option value={0}>Mọi người có thể sử dụng</Select.Option>
              <Select.Option value={1}>Người dùng đã đăng nhập</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="usage_limit"
            label="Số lượng Voucher"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Ngày tạo" required>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Chọn ngày tạo"
              className="w-full"
            />
          </Form.Item>

          <Form.Item label="Ngày hết hạn" required>
            <DatePicker
              selected={expiryDate}
              onChange={(date) => setExpiryDate(date as Date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Chọn ngày hết hạn"
              className="w-full"
            />
          </Form.Item>
        </div>

        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit">
            Cập nhật Voucher
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

// CSS cho DatePicker
const styles = `
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 4px 11px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default EditVoucher;

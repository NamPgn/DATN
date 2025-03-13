/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import { useEffect, useRef } from "react";
import { updateVoucher } from "../../../sevices/voucher";
import moment from "moment";

const EditVoucher = ({ voucher, refetch }: any) => {
  const [form] = Form.useForm();
  const prevVoucherRef = useRef<any>(null);

  useEffect(() => {
    if (voucher && voucher !== prevVoucherRef.current) {
      prevVoucherRef.current = voucher;
      form.setFieldsValue({
        ...voucher,
        start_date: moment(voucher.start_date),
        expiry_date: moment(voucher.expiry_date),
      });
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
        start_date: values.start_date.format("YYYY-MM-DD"),
        expiry_date: values.expiry_date.format("YYYY-MM-DD"),
      };

      await updateVoucher(data, Number(voucher.id));
      message.success("Cập nhật Voucher thành công");
      refetch();
    } catch (error) {
      console.error("Lỗi khi cập nhật Voucher:", error);
      message.error("Cập nhật Voucher không thành công");
    }
  };

  return (
    <div className="edit-voucher-form">
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="code" label="Mã Voucher" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="name" label="Tên Voucher" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select style={{ width: "250px" }} placeholder="Giảm giá theo ?">
            <Select.Option value={0}>Giảm giá theo số tiền</Select.Option>
            <Select.Option value={1}>Giảm giá theo phần trăm</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate>
          {({ getFieldValue }) => {
            const type = getFieldValue("type");
            return type === 0 ? (
              <Form.Item name="amount" label="Số tiền giảm">
                <InputNumber />
              </Form.Item>
            ) : type === 1 ? (
              <Form.Item name="discount_percent" label="Phần trăm giảm">
                <InputNumber />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <Form.Item name="min_product_price" label="Giá tối thiểu của đơn hàng">
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="max_discount_amount"
          label="Số tiền giảm tối đa của đơn hàng"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Loại Voucher" name="for_logged_in_users">
          <Select style={{ width: "220px" }}>
            <Select.Option value={0}>Mọi người có thể sử dụng</Select.Option>
            <Select.Option value={1}>Người dùng đã đăng nhập</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="usage_limit"
          label="Số lượng Voucher"
          rules={[{ required: true, message: "Số lần được sử dụng mã" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="start_date"
          label="Ngày tạo"
          rules={[{ required: true, message: "Ngày tạo mã giảm" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="expiry_date"
          label="Ngày hết hạn"
          rules={[{ required: true, message: "Ngày kết thúc mã giảm" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Voucher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditVoucher;

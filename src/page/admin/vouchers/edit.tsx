/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, InputNumber, DatePicker, Button } from "antd";
import { updateVoucher } from "../../../sevices/voucher";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const EditVoucher = ({ voucher, refetch, onClose }: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set initial values
  React.useEffect(() => {
    form.setFieldsValue({
      code: voucher.code,
      name: voucher.name,
      description: voucher.description,
      discount_percent: voucher.discount_percent,
      max_discount_amount: voucher.max_discount_amount,
      min_product_price: voucher.min_product_price,
      amount: voucher.amount,
      start_date: dayjs(voucher.start_date),
      expiry_date: dayjs(voucher.expiry_date),
      usage_limit: voucher.usage_limit,
      type: voucher.type,
    });
  }, [voucher]);

  const handleSubmit = async (values: any) => {
    if (values.amount === null || values.amount === undefined) {
      delete values.amount;
    }
    if (
      values.discount_percent === null ||
      values.discount_percent === undefined
    ) {
      delete values.discount_percent;
    }
    values.start_date = dayjs(values.start_date).format("YYYY-MM-DD");
    values.expiry_date = dayjs(values.expiry_date).format("YYYY-MM-DD");
    setLoading(true);

    try {
      await updateVoucher(values, voucher.id);
      toast.success("Cập nhật voucher thành công!");
      refetch();
      onClose();
    } catch (error) {
      console.error("Lỗi cập nhật voucher:", error);
      toast.error("Cập nhật không thành công!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="code" label="Mã voucher" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="discount_percent" label="Giảm giá theo phần trăm">
        <InputNumber min={0} max={100} />
      </Form.Item>
      <Form.Item name="max_discount_amount" label="Số tiền giảm tối đa">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item name="min_product_price" label="Giá tối thiểu để áp dụng">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item name="amount" label="Giảm giá bằng số tiền">
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="start_date" label="Ngày bắt đầu">
        <DatePicker />
      </Form.Item>
      <Form.Item name="expiry_date" label="Ngày hết hạn">
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Số lần được sử dụng mã" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name="usage_limit" label="Giới hạn sử dụng">
        <InputNumber min={1} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Cập nhật
      </Button>
    </Form>
  );
};

export default EditVoucher;

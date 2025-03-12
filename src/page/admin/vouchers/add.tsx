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
import { createVoucher } from "../../../sevices/voucher";
import moment from "moment";
import { useWatch } from "antd/es/form/Form";

const AddVoucher = ({ refetch }: any) => {
  const [form] = Form.useForm();
  const type = useWatch("type", form);
  const onFinish = async (values: any) => {
    try {
      const data = {
        ...values,
        start_date: values.start_date.format("YYYY-MM-DD"),
        expiry_date: values.expiry_date.format("YYYY-MM-DD"),
      };
      await createVoucher(data);
      message.success("Thêm Voucher thành công");
      form.resetFields();
      refetch();
    } catch (error) {
      console.error("Lỗi khi thêm Voucher:", error);
      message.error("Thêm Voucher không thành công");
    }
  };
  return (
    <div className="add-voucher-form">
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          start_date: moment(),
          expiry_date: moment(),
          type: 0,
          for_logged_in_users: 0,
        }}
      >
        <Form.Item
          name="code"
          label="Voucher Code"
          rules={[{ required: true, message: "Vui lòng nhập mã code" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Voucher Name"
          rules={[{ required: true, message: "Vui lòng nhập name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select className="w-50" placeholder="Giảm giá theo ?">
            <Select.Option value={0}>
              Vorcher giảm giá theo số tiền
            </Select.Option>
            <Select.Option value={1}>Giảm giá theo phần trăm</Select.Option>
          </Select>
        </Form.Item>

        {type === 0 && (
          <>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                { required: false, message: "Vui lòng nhập số tiền giảm giá" },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="min_product_price"
              label="Min Product Price"
              rules={[
                {
                  required: false,
                  message: "Giá sản phẩm tối thiểu có thể sử dụng mã",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </>
        )}

        {type === 1 && (
          <>
            <Form.Item
              name="discount_percent"
              label="Discount Percent"
              rules={[
                {
                  required: false,
                  message: "Vui lòng nhập phần trăm giảm giá",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="max_discount_amount"
              label="Max Discount Amount"
              rules={[
                {
                  required: false,
                  message: "Số tiền tối đa được giảm giá",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </>
        )}

        <Form.Item label="Dành cho" name="for_logged_in_users">
          <Select className="w-50">
            <Select.Option value={0}>Người chưa đăng nhập</Select.Option>
            <Select.Option value={1}>Người đã đăng nhập</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="usage_limit"
          label="Usage Limit"
          rules={[{ required: true, message: "Số lần được sử dụng mã" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="start_date"
          label="Start Date"
          rules={[{ required: true, message: "Ngày tạo mã giảm" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="expiry_date"
          label="Expiry Date"
          rules={[{ required: true, message: "Ngày kết thúc mã giảm" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Voucher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVoucher;

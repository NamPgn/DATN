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
        start_date: values.start_date.format("YYYY-MM-DD "),
        expiry_date: values.expiry_date.format("YYYY-MM-DD "),
      };
      await createVoucher(data);
      message.success("Thêm Voucher thành công");
      form.resetFields();
      refetch();
    } catch (error: any) {
      message.error(error?.response?.data?.message);
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
          label="Mã Voucher"
          rules={[{ required: true, message: "Vui lòng nhập mã code" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên Voucher"
          rules={[{ required: true, message: "Vui lòng nhập name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea
            style={{ width: "100%" }}
            placeholder="Nhập mô tả..."
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        </Form.Item>

        <Form.Item label="Loại" name="type">
          <Select style={{ width: "250px" }} placeholder="Giảm giá theo ?">
            <Select.Option value={0}>
              Vorcher giảm giá theo số tiền
            </Select.Option>
            <Select.Option value={1}>
              Voucher giảm giá theo phần trăm
            </Select.Option>
          </Select>
        </Form.Item>

        {type === 0 ? (
          <Form.Item
            name="amount"
            label="Số tiền giảm"
            rules={[
              { required: false, message: "Vui lòng nhập số tiền giảm giá" },
            ]}
          >
            <InputNumber />
          </Form.Item>
        ) : type === 1 ? (
          <>
            <Form.Item
              name="discount_percent"
              label="Phần trăm giảm"
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
              label="Số tiền giảm tối đa của đơn hàng"
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
        ) : null}

        <Form.Item
          name="min_product_price"
          label="Giá tối thiểu của đơn hàng"
          rules={[
            {
              required: false,
              message: "Giá sản phẩm tối thiểu có thể sử dụng mã",
            },
          ]}
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
          <DatePicker placeholder="Ngày tạo" />
        </Form.Item>

        <Form.Item
          name="expiry_date"
          label="Ngày hết hạn"
          rules={[{ required: true, message: "Ngày kết thúc mã giảm" }]}
        >
          <DatePicker placeholder="Ngày hết hạn" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm Voucher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVoucher;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MVTable from "../../../components/UI/Core/MV/Table";

import { useQuery } from "react-query";
import { ButtonAdd, MyButton } from "../../../components/UI/Core/Button";
import { Link } from "react-router-dom";
import {  getOrders } from "../../../sevices/orders";
import { columnsOrders } from "../../../constant";
import {  EyeOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker, Form, Input, Select } from 'antd';
import 'dayjs/locale/vi';
import TailwindComponent from "../../../components/Tailwind/TailwinComponent";
import locale from "antd/es/locale/vi_VN";

const { RangePicker } = DatePicker;

const OrdersAdmin = () => {
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const [searchParams, setSearchParams] = useState({
    order_code: '',
    order_status: undefined,
    payment_status: undefined,
    shipping_status: undefined,
    order_name: '',
    order_phone: '',
    start_day: '',
    end_day: ''
  });

  const [form] = Form.useForm();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: Orders }: any = useQuery({
    queryKey: ["Orders", page, searchParams],
    queryFn: async () => {
      return await getOrders(page, searchParams);
    },
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const orderStatusOptions = [
    { value: 1, label: 'Chờ xác nhận' },
    { value: 2, label: 'Đã xác nhận' },
    { value: 3, label: 'Đang giao' },
    { value: 4, label: 'Đã giao thành công' },
    { value: 5, label: 'Hoàn thành' },
    { value: 6, label: 'Yêu cầu trả hàng' },
    { value: 7, label: 'Đã duyệt trả hàng' },
    { value: 8, label: 'Đã hoàn tiền' },
    { value: 9, label: 'Đã hủy' }
  ];

  const paymentStatusOptions = [
    { value: 1, label: 'Chưa thanh toán' },
    { value: 2, label: 'Đã thanh toán' },
    { value: 3, label: 'Đã hoàn tiền' },
    { value: 4, label: 'Đã hủy' }
  ];

  const shippingStatusOptions = [
    { value: 1, label: 'Chưa tạo vận đơn' },
    { value: 2, label: 'Đã tạo vận đơn (chưa lấy)' },
    { value: 3, label: 'Đã lấy hàng' },
    { value: 4, label: 'Đang giao' },
    { value: 5, label: 'Đã giao' },
    { value: 6, label: 'Đã hoàn hàng' },
    { value: 7, label: 'Giao thất bại' },
    { value: 8, label: 'Vận đơn bị hủy' }
  ];

  const handleSearch = (values: any) => {
    const { dateRange, ...rest } = values;
    const params = {
      ...rest,
      start_day: dateRange ? dateRange[0].format('YYYY-MM-DD') : '',
      end_day: dateRange ? dateRange[1].format('YYYY-MM-DD') : ''
    };
    setSearchParams(params);
  };

  const handleReset = () => {
    form.resetFields();
    setSearchParams({
      order_code: '',
      order_status: undefined,
      payment_status: undefined,
      shipping_status: undefined,
      order_name: '',
      order_phone: '',
      start_day: '',
      end_day: ''
    });
  };

  const data =
    Orders &&
    Orders?.data?.data.map((item: any) => {
      return {
        key: item.id,
        stt: item.id,
        code: item.code,
        o_name: item.o_name,
        o_phone: item.phone,
        final_amount: item.final_amount,
        payment_method: item.payment_method,
        stt_payment: item.payment_status,
        stt_track: item.order_status,
        action: (
          <div className="d-flex gap-2">
            <Link to={`/dashboard/orders/${item.id}`} className="text-blue-500">
              <MyButton icon={<EyeOutlined />} type="dashed">
                Chi tiết
              </MyButton>
            </Link>
            {/* <Link to={`/dashboard/orders/edit/${item.id}`}>
              <Button icon={<EditOutlined />} color="blue" variant="filled">
                Edit
              </Button>
            </Link> */}
          </div>
        ),
      };
    });

  return (
    <ConfigProvider locale={locale}>
      
        <TailwindComponent>
          <div className="mb-6 bg-white p-6 rounded-lg shadow">
            <Form
              form={form}
              onFinish={handleSearch}
              layout="vertical"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Form.Item name="order_code" label="Mã đơn hàng">
                <Input placeholder="Nhập mã đơn hàng" />
              </Form.Item>

              <Form.Item name="order_name" label="Tên khách hàng">
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>

              <Form.Item name="order_phone" label="Số điện thoại">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item name="order_status" label="Trạng thái đơn hàng">
                <Select
                  placeholder="Chọn trạng thái"
                  options={orderStatusOptions}
                  allowClear
                />
              </Form.Item>

              <Form.Item name="payment_status" label="Trạng thái thanh toán">
                <Select
                  placeholder="Chọn trạng thái"
                  options={paymentStatusOptions}
                  allowClear
                />
              </Form.Item>

              <Form.Item name="shipping_status" label="Trạng thái giao hàng">
                <Select
                  placeholder="Chọn trạng thái"
                  options={shippingStatusOptions}
                  allowClear
                />
              </Form.Item>

              <Form.Item name="dateRange" label="Khoảng thời gian">
                <RangePicker 
                  format="DD/MM/YYYY"
                  className="w-full"
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                />
              </Form.Item>

              <Form.Item className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Đặt lại
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Tìm kiếm
                </button>
              </Form.Item>
            </Form>
          </div>

          <ButtonAdd path={`/dashboard/orders/add`} />

          <MVTable
            columns={columnsOrders}
            rowSelection={rowSelection}
            dataSource={data}
            scroll={{ x: 1000, y: 1050 }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              current: page,
              onChange: handlePageChangePage,
              total: Orders?.data?.total,
            }}
          ></MVTable>
        </TailwindComponent>
    </ConfigProvider>
  );
};

export default OrdersAdmin;

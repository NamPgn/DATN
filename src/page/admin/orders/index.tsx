/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MVTable from "../../../components/UI/Core/MV/Table";

import { useMutation, useQuery } from "react-query";
import { ButtonAdd, MyButton } from "../../../components/UI/Core/Button";
import { Link } from "react-router-dom";
import { Button, Modal, Popconfirm } from "antd";
import { toast } from "react-toastify";
import { delOrders, getOrders } from "../../../sevices/orders";
import { columnsOrders } from "../../../constant";
import { DeleteFilled, EyeOutlined, PlusOutlined } from "@ant-design/icons";

const OrdersAdmin = () => {
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: Orders, refetch }: any = useQuery({
    queryKey: ["Orders", page],
    queryFn: async () => {
      return await getOrders(page);
    },
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePageChangePage = (page: number) => {
    setPage(page);
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

            <Link to={`/dashboard/orders/send/${item.id}`}>
              <Button icon={<PlusOutlined />} color="green" variant="text">
                Gửi đơn hàng
              </Button>
            </Link>
          </div>
        ),
      };
    });

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default OrdersAdmin;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MVTable from "../../../components/UI/Core/MV/Table";

import { useMutation, useQuery } from "react-query";
import { MyButton } from "../../../components/UI/Core/Button";
import { Link } from "react-router-dom";
import { Button, Modal, Popconfirm } from "antd";
import { toast } from "react-toastify";
import { delOrders, getOrders } from "../../../sevices/orders";
import { columnsOrders } from "../../../constant";

const OrdersAdmin = () => {
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingorder, setEditingorder] = useState<any>(null);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: Orders, refetch }: any = useQuery({
    queryKey: ["Orders", page],
    queryFn: async () => {
      return await getOrders(page);
    },
  });
  const { mutate: deleteOrders } = useMutation({
    mutationFn: async (id: string) => {
      return await delOrders(id);
    },
    onSuccess: () => {
      toast.success("Xóa order thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa", error);
      toast.error("Xóa không thành công");
    },
  });

  const showAddorderModal = () => {
    setIsModalVisible(true);
  };

  const showEditorderModal = (order: any) => {
    setEditingorder(order);
    setIsEditModalVisible(true);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setEditingorder(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const data =
    Orders &&
    Orders?.data?.data?.data.map((item: any) => {
      return {
        key: item.id,
        stt: item.id,
        code: item.code,
        o_name: item.o_name,
        o_phone: item.o_phone,
        final_amount: item.final_amount,
        payment_method: item.payment_method,
        stt_payment: item.stt_payment.name,
        stt_track: item.stt_track.name,
        action: (
          <div className="d-flex gap-2">
            <Link to={`/dashboard/orders/${item.id}`} className="text-blue-500">
              <MyButton type="dashed">Detail</MyButton>
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa ?"
              onConfirm={() => deleteOrders(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <MyButton type="primary" danger>
                Delete
              </MyButton>
            </Popconfirm>

            <Link to={`/dashboard/orders/edit/${item.id}`}>
              <MyButton type="primary" onClick={() => showEditorderModal(item)}>
                Edit
              </MyButton>
            </Link>
          </div>
        ),
      };
    });

  return (
    <React.Fragment>
      <div className="flex">
        <Button type="primary" onClick={showAddorderModal} className="mb-3">
          Add order
        </Button>
      </div>

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

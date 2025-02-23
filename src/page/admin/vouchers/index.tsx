/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsVouchers } from "../../../constant";
import {
  delMultipleVouchers,
  delVouchers,
  getVouchers,
} from "../../../sevices/voucher";
import { useMutation, useQuery } from "react-query";
import { MyButton } from "../../../components/UI/Core/Button";
import { Link } from "react-router-dom";
import { Button, Modal, Popconfirm } from "antd";
import AddVoucher from "./add";
import { toast } from "react-toastify";

const VoucherAdmin = () => {
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: vouchers, refetch }: any = useQuery({
    queryKey: ["vouchers", page],
    queryFn: async () => {
      return await getVouchers(page);
    },
  });

  const { mutate: deleteVouchers } = useMutation({
    mutationFn: async (id: string) => {
      return await delVouchers(id);
    },
    onSuccess: () => {
      toast.success("Xóa voucher thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa", error);
      toast.error("Xóa không thành công");
    },
  });

  const { mutate: deleteMultipleVouchers } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await delMultipleVouchers(ids);
    },
    onSuccess: () => {
      toast.success("Xóa nhiều voucher thành công");
      setSelectedRowKeys([]);
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa nhiều voucher:", error);
      toast.error("Xóa không thành công");
    },
  });

  const showAddVoucherModal = () => {
    setIsModalVisible(true);
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

  // const handleDelVoucher = async (id: string) => {
  //   try {
  //     await delVouchers(id);
  //     message.success("Xóa voucher thành công");
  //     refetch();
  //   } catch (error) {
  //     console.log("Xóa không thành công", error);
  //   }
  // };

  const handleDeleteSelectedData = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("VUi lòng chọn ít nhất một voucher để xóa");
      return;
    }
    if (Array.isArray(selectedRowKeys)) {
      deleteMultipleVouchers(selectedRowKeys);
    } else {
      toast.error("Dữ liệu không hợp lệ");
    }
  };

  const data =
    vouchers &&
    vouchers?.data?.data?.map((item: any) => {
      return {
        key: item.id,
        stt: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        discount_percent: item.discount_percent,
        max_discount_amount: item.max_discount_amount,
        min_product_price: item.min_product_price,
        amount: item.amount,
        start_date: item.start_date,
        times_used: item.times_used,
        expiry_date: item.expiry_date,
        usage_limit: item.usage_limit,
        action: (
          <div className="d-flex gap-2">
            <Link
              to={`/dashboard/vouchers/${item.id}`}
              className="text-blue-500"
            >
              <MyButton type="dashed">Detail</MyButton>
            </Link>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa ?"
              onConfirm={() => deleteVouchers(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <MyButton type="primary" danger>
                Delete
              </MyButton>
            </Popconfirm>

            <Link to={`/dashboard/vouchers/update/${item.id}`}>
              <MyButton type="primary">Edit</MyButton>
            </Link>
          </div>
        ),
      };
    });

  return (
    <React.Fragment>
      <div className="flex">
        <Button type="primary" onClick={showAddVoucherModal} className="mb-3">
          Add Voucher
        </Button>
      </div>

      <MyButton danger className="mb-3 ml-2" onClick={handleDeleteSelectedData}>
        Delete Selected
      </MyButton>
      <MVTable
        columns={columnsVouchers}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1050 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          current: page,
          onChange: handlePageChangePage,
          total: vouchers?.data?.total,
        }}
      ></MVTable>

      <Modal
        title="Add New Voucher"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddVoucher refetch={refetch} />{" "}
      </Modal>
    </React.Fragment>
  );
};

export default VoucherAdmin;

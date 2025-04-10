/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsVouchers } from "../../../constant";
import { delMultipleVouchers, getVouchers } from "../../../sevices/voucher";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MyButton } from "../../../components/UI/Core/Button";
import { Button, Modal, Popconfirm } from "antd";
import AddVoucher from "./add";
import { toast } from "react-toastify";
import EditVoucher from "./edit";
import { DeleteOutlined } from "@ant-design/icons";
import VoucherDetailModal from "./detail";

const VoucherAdmin = () => {
  const queryClient = useQueryClient();
  const savedPage = sessionStorage.getItem("voucherPage");
  const [page, setPage] = useState<number>(savedPage ? Number(savedPage) : 1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [detailVoucher, setDetailVoucher] = useState<any>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<any>(null);

  const showDetailModal = (voucher: any) => {
    setDetailVoucher(voucher);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setDetailVoucher(null);
  };

  useEffect(() => {
    sessionStorage.setItem("voucherPage", String(page));
  }, [page]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: vouchers, refetch }: any = useQuery({
    queryKey: ["vouchers", page],
    queryFn: async () => {
      return await getVouchers(page);
    },
  });

  const { mutate: deleteMultipleVouchers } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await delMultipleVouchers(ids);
    },
    onSuccess: () => {
      toast.success("Xóa nhiều voucher thành công");
      setSelectedRowKeys([]);
      queryClient.invalidateQueries(["VOUCHERCL"]);
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa nhiều voucher:", error);
      toast.error("Xóa không thành công");
    },
  });

  const handleDeleteSelectedData = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("VUi lòng chọn ít nhất một voucher để xóa");
      return;
    }
    deleteMultipleVouchers(selectedRowKeys);
  };

  const showAddVoucherModal = () => {
    setIsModalVisible(true);
    queryClient.invalidateQueries(["VOUCHERCL"]);
  };

  const showEditVoucherModal = (voucher: any) => {
    setEditingVoucher(voucher);
    setIsEditModalVisible(true);
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setEditingVoucher(null);
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
        for_logged_in_users: item.type,
        type: item.type,
        min_product_price: item.min_product_price,
        amount: item.amount,
        start_date: item.start_date,
        times_used: item.times_used,
        expiry_date: item.expiry_date,
        usage_limit: item.usage_limit,
        action: (
          <div className="d-flex gap-2">
            <MyButton type="dashed" onClick={() => showDetailModal(item)}>
              Chi Tiết
            </MyButton>
            <MyButton type="primary" onClick={() => showEditVoucherModal(item)}>
              Sửa
            </MyButton>
          </div>
        ),
      };
    });

  return (
    <React.Fragment>
      <div className="d-flex gap-2">
        <Button type="primary" onClick={showAddVoucherModal} className="mb-3">
          Thêm Voucher
        </Button>

        <Popconfirm
          title="Bạn có chắc chắn muốn xóa ?"
          onConfirm={handleDeleteSelectedData}
          okText="Yes"
          cancelText="No"
          className="mb-3"
        >
          <MyButton type="primary" danger icon={<DeleteOutlined />}>
            Xóa Voucher
          </MyButton>
        </Popconfirm>
      </div>

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
        title="Thêm Mới Voucher"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddVoucher refetch={refetch} />{" "}
      </Modal>

      <Modal
        title="Edit Voucher"
        open={isEditModalVisible}
        onCancel={handleCancelEdit}
        footer={null}
      >
        {editingVoucher && (
          <EditVoucher
            voucher={editingVoucher}
            refetch={refetch}
            onClose={handleCancelEdit}
          />
        )}
      </Modal>
      {isDetailModalVisible && (
        <VoucherDetailModal
          visible={isDetailModalVisible}
          onClose={closeDetailModal}
          voucher={detailVoucher}
        />
      )}
    </React.Fragment>
  );
};

export default VoucherAdmin;

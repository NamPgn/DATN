/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsVouchers } from "../../../constant";
import { delMultipleVouchers, getVouchers } from "../../../sevices/voucher";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MyButton } from "../../../components/UI/Core/Button";
import { Button, Modal, Popconfirm, Card, Space, Tooltip } from "antd";
import AddVoucher from "./add";
import { toast } from "react-toastify";
import EditVoucher from "./edit";
import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
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

  useEffect(() => {
    sessionStorage.setItem("voucherPage", String(page));
  }, [page]);

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

  const showDetailModal = (voucher: any) => {
    setDetailVoucher(voucher);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
    setDetailVoucher(null);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDeleteSelectedData = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một voucher để xóa");
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

  const data = vouchers?.data?.data?.map((item: any) => ({
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
      <Space size="middle">
        <MyButton type="dashed" onClick={() => showDetailModal(item)}>
          Chi tiết
        </MyButton>
        <MyButton type="primary" onClick={() => showEditVoucherModal(item)}>
          Sửa
        </MyButton>
      </Space>
    ),
  }));

  return (
    <Card>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quản lý Voucher</h2>
          <Space>
            <Tooltip title="Làm mới">
              <Button icon={<ReloadOutlined />} onClick={() => refetch()} />
            </Tooltip>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddVoucherModal}
            >
              Thêm Voucher
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa?"
              onConfirm={handleDeleteSelectedData}
              okText="Xóa"
              cancelText="Hủy"
              disabled={selectedRowKeys.length === 0}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                disabled={selectedRowKeys.length === 0}
              >
                Xóa ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>

      <MVTable
        columns={columnsVouchers}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        dataSource={data}
        scroll={{ x: 1000, y: 650 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          current: page,
          onChange: setPage,
          total: vouchers?.data?.total,
          showTotal: (total: any) => `Tổng ${total} voucher`,
        }}
      />

      <Modal
        title="Thêm Voucher Mới"
        open={isModalVisible}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <AddVoucher refetch={refetch} />
      </Modal>

      <Modal
        title="Chỉnh Sửa Voucher"
        open={isEditModalVisible}
        onCancel={handleCancelEdit}
        width={800}
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
    </Card>
  );
};

export default VoucherAdmin;

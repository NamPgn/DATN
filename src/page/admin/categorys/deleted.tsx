/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Image, Popconfirm, Tag } from "antd";
import { Link } from "react-router-dom";
import { MyButton } from "../../../components/UI/Core/Button";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsCategory } from "../../../constant";
import { useMutation, useQuery } from "react-query";
import {
  deleteHardCategorys,
  deleteMultipleHardCategorys,
  getsCategoryDeleted,
  retoreCategoryDeleted,
  retoreMultipleCategoryDeleted,
} from "../../../sevices/category";
import MVConfirm from "../../../components/UI/Core/Confirm";
import { toast } from "react-toastify";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

const CategoryDeleted = () => {
  const [page, setPage] = useState(1);

  const [valueId, setValue] = useState();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: categoryDeleted, refetch }: any = useQuery({
    queryKey: ["categoryDeleted"],
    queryFn: async () => (await getsCategoryDeleted()).data,
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteHardCategorys(id);
    },
    onSuccess: () => {
      toast.success("Xóa danh mục thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa nhiều danh mục:", error);
      toast.error("Xóa không thành công");
    },
  });

  const { mutate: mutateRetore } = useMutation({
    mutationFn: async (id: string) => {
      return await retoreCategoryDeleted(id);
    },
    onSuccess: () => {
      toast.success("Khôi phục thành công");
      refetch();
    },
    onError: () => {
      toast.error("Khôi phục không thành công");
    },
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChange = (newValue: any) => {
    setValue(newValue);
  };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const { mutate: deleteMultiple } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await deleteMultipleHardCategorys(ids);
    },
    onSuccess: () => {
      toast.success("Xóa nhiều danh mục thành công");
      setSelectedRowKeys([]);
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa nhiều danh mục:", error);
      toast.error("Xóa không thành công");
    },
  });

  const handleDeleteSelectedData = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một danh mục để xóa");
      return;
    }
    deleteMultiple(selectedRowKeys);
  };

  const { mutate: restoreCategories } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await retoreMultipleCategoryDeleted(ids);
    },
    onSuccess: () => {
      toast.success("Khôi phục nhiều danh mục thành công");
      setSelectedRowKeys([]);
      refetch();
    },
    onError: () => {
      toast.error("Khôi phục thất bại");
    },
  });

  const handleRestoreSelected = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất 1 danh mục để khôi phục!");
      return;
    }
    restoreCategories(selectedRowKeys);
  };

  const data = categoryDeleted?.data?.map((item: any, index: number) => {
    return {
      key: item.id,
      child: item.children,
      stt: item.id,
      name: <Link to={"/q/" + item.id}>{item.name}</Link>,
      plainName: item.name,
      slug: item.slug,
      image: (
        <Image
          width={150}
          height={200}
          style={{ objectFit: "cover" }}
          src={item.linkImg}
        />
      ),
      createAt: item.createdAt,
      duration: item.time,
      isActive:
        item.isActive == 0 ? (
          <Tag color="warning">isPending</Tag>
        ) : (
          <Tag color="success">Done</Tag>
        ),
      year: item.year,
      set: item.up,
      action: (
        <div className=" gap-1 ">
          <MVConfirm
            title="Có khôi phục không"
            onConfirm={() => mutateRetore(item.id)}
          >
            <MyButton
              style={{
                marginRight: "10px",
              }}
            >
              Retore
            </MyButton>
          </MVConfirm>
          <MVConfirm
            title="Có xóa vĩnh viễn danh mục không"
            onConfirm={() => mutate(item.id)}
          >
            <MyButton danger className="ml-3">
              Delete
            </MyButton>
          </MVConfirm>
        </div>
      ),
    };
  });
  return (
    <React.Fragment>
      <div className="mb-3">
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa ?"
          onConfirm={handleDeleteSelectedData}
          okText="Yes"
          cancelText="No"
        >
          <MyButton type="primary" danger icon={<DeleteOutlined />}>
            Delete Selected
          </MyButton>
        </Popconfirm>
      </div>
      <div className="mb-3">
        <Popconfirm
          title="Bạn có chắc chắn muốn khôi phục"
          onConfirm={handleRestoreSelected}
          okText="Yes"
          cancelText="No"
        >
          <MyButton
            type="primary"
            className="bg-green-600 text-white hover:bg-green-700"
            icon={<ReloadOutlined />}
          >
            Khôi phục lại các danh mục đã chọn
          </MyButton>
        </Popconfirm>
      </div>
      <MVTable
        columns={columnsCategory}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 24,
          showSizeChanger: true,
          pageSizeOptions: ["24", "44", "64"],
          current: page,
          onChange: handlePageChangePage,
          total: categoryDeleted?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default CategoryDeleted;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Popconfirm, Tag } from "antd";
import { Link } from "react-router-dom";
import { ButtonAdd, MyButton } from "../../../components/UI/Core/Button";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsCategory } from "../../../constant";
import { useMutation, useQuery } from "react-query";
import {
  delCategories,
  delMultipleCategories,
  getCategorys,
} from "../../../sevices/category";
import MVConfirm from "../../../components/UI/Core/Confirm";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

const CategoryAdmin = () => {
  const [page, setPage] = useState(1);

  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: category, refetch }: any = useQuery({
    queryKey: ["categories", page],
    queryFn: async () => await getCategorys(page),
  });
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await delCategories(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa:", error);
      toast.error("Xóa không thành công");
    },
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const onChange = (newValue: any) => {
  //   setValue(newValue);
  // };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const { mutate: deleteMultiple } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await delMultipleCategories(ids);
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

  const expandedRowRender = (record: any) => {
    const columns = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Action",
        key: "operation",
        render: (_text: any, category: any) => (
          <>
            <MVConfirm
              title="Delete the category"
              onConfirm={() => mutate(category.id)}
              okText="Yes"
              cancelText="No"
            >
              <MyButton type="text" shape="circle" className="ml-2">
                <DeleteOutlined />
              </MyButton>
              <Link to={`/dashboard/category/edit/${category.id}`}>
                <MyButton type="primary">Edit</MyButton>
              </Link>
            </MVConfirm>
          </>
        ),
      },
    ];

    // // Lấy danh sách category theo id của bảng chac
    const dataCategorys = record.child?.map((item: any, index: number) => ({
      key: `${data.id}-${index}`,
      id: item.id,
      name: item.name,
    }));
    return (
      <MVTable
        columns={columns}
        dataSource={dataCategorys || []}
        pagination={false}
      />
    );
  };
  const data =
    category &&
    category?.data?.data?.map((item: any) => {
      return {
        key: item.id,
        child: item.children,
        stt: item.id,
        name: <Link to={"/q/" + item.id}>{item.name}</Link>,
        slug: item.slug,
        createAt: item.createdAt,
        isActive:
          item.isActive == 0 ? (
            <Tag color="warning">isPending</Tag>
          ) : (
            <Tag color="success">Done</Tag>
          ),
        action: (
          <div className="d-flex gap-1">
            <Link to={`/dashboard/category/edit/${item.id}`}>
              <MyButton type="primary">Edit</MyButton>
            </Link>
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton danger className="ml-2">
                Delete
              </MyButton>
            </MVConfirm>
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <ButtonAdd path={`/dashboard/category/add`} />
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
      <MVTable
        columns={columnsCategory}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        pagination={{
          defaultPageSize: 30,
          showSizeChanger: true,
          pageSizeOptions: ["30", "50", "70"],
          current: page,
          onChange: handlePageChangePage,
          total: category?.data?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default CategoryAdmin;

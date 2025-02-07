import React, { useState } from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { delComments, getComments } from "../../../sevices/comment";
import { MyButton } from "../../../components/UI/Core/Button";
import MVConfirm from "../../../components/UI/Core/Confirm";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsATTR, columnsComments } from "../../../constant";

const CommentAdmin = () => {
  const [page, setPage] = useState(1);

  const [valueId, setValue] = useState();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: comments, refetch }: any = useQuery({
    queryKey: ["comments", page],
    queryFn: async () => await getComments(page),
  });
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await delComments(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      refetch();
    },
    onError: () => {
      toast.success("Xóa không thành công");
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

  const handleDeleteSelectedData = async () => {
    console.log(selectedRowKeys);
    // const response: any = await deleteMultipleProduct(selectedRowKeys);
    // if (response.data.success == true) {
    //   setInit(!init);
    //   toast.success("Delete products successfully");
    // } else {
    //   toast.error("Error deleting products");
    // }
  };

  const data =
    comments &&
    comments?.data?.data?.data?.map((item: any, index: number) => {
      return {
        key: item.id,
        child: item.children,
        stt: item.id,
        content: item.content,
        product_id: item.product_id,
        rating: item.rating,
        user_id: item.user_id,
        is_active:
          item.isActive == 0 ? (
            <Tag color="warning">Hidden</Tag>
          ) : (
            <Tag color="success">Active</Tag>
          ),
        action: (
          <div className="d-flex gap-1">
            <Link to={`/dashboard/comments/edit/${item.id}`}>
              <MyButton type="primary">Edit</MyButton>
            </Link>
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton danger className="ml-2">
                Delete
              </MyButton>
            </MVConfirm>
            <Link to={`/dashboard/commentsValue/${item.id}`}>
              <MyButton>Comments Value</MyButton>
            </Link>
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <Link to={`/dashboard/comments/add`}>
        <MyButton type="primary" className="mb-3">
          Add
        </MyButton>
      </Link>
      <MVTable
        columns={columnsComments}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          current: page,
          onChange: handlePageChangePage,
          total: comments?.data?.data?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default CommentAdmin;

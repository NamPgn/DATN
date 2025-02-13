import React, { useState } from "react";
import { Input, Modal, Tag } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  delComments,
  delMultipleComments,
  getComments,
  replyComment,
  statusComment,
} from "../../../sevices/comment";
import { MyButton } from "../../../components/UI/Core/Button";
import MVConfirm from "../../../components/UI/Core/Confirm";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsATTR, columnsComments } from "../../../constant";

const CommentAdmin = () => {
  const [page, setPage] = useState(1);
  const [hiddenComments, setHiddenComments] = useState<Record<string, boolean>>(
    {}
  );
  const [selectAllHidden, setSelectAllHidden] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
  // const [valueId, setValue] = useState();
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

  // const handleDeleteSelectedData = async () => {
  //   console.log(selectedRowKeys);
  //   const response: any = await delComments(selectedRowKeys);
  //   if (response.data.success == true) {
  //     setInit(!init);
  //     toast.success("Delete products successfully");
  //   } else {
  //     toast.error("Error deleting products");
  //   }
  // };
  const { mutate: deleteMultiple } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await delMultipleComments(ids);
    },
    onSuccess: () => {
      toast.success("Xóa nhiều comment thành công");
      setSelectedRowKeys([]); // Xóa selection sau khi xóa thành công
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa nhiều comment:", error);
      toast.error("Xóa không thành công");
    },
  });

  const handleDeleteSelectedData = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một comment để xóa");
      return;
    }
    deleteMultiple(selectedRowKeys);
  };

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return await statusComment(id, isActive);
    },
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Cập nhật trạng thái thất bại");
    },
  });

  const toggleCommentVisibility = (id: string) => {
    setHiddenComments((prev) => {
      const newHiddenState = !prev[id];
      updateStatus({ id, isActive: !newHiddenState });
      return { ...prev, [id]: newHiddenState };
    });
  };

  const toggleSelectedComments = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một comment");
      return;
    }

    const allHidden = selectedRowKeys.every((id:any) => hiddenComments[id]);
    setHiddenComments((prev) => {
      const updatedHidden = { ...prev };
      selectedRowKeys.forEach((id:any) => {
        updatedHidden[id] = !allHidden;
        updateStatus({ id: String(id), isActive: allHidden });
      });
      return updatedHidden;
    });

    setSelectAllHidden(!allHidden);
  };

  const { mutate: sendReply } = useMutation({
    mutationFn: async ({ id, reply }: { id: string; reply: string }) => {
      return await replyComment(id, reply);
    },
    onSuccess: () => {
      toast.success("Phản hồi thành công!");
      setReplyModalVisible(false);
      setReplyText("");
      setReplyCommentId(null);
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi phản hồi:", error);
      toast.error("Phản hồi thất bại");
    },
  });

  const openReplyModal = (commentId: string, reply: string) => {
    if (reply) {
      toast.warning("Comment này đã được phản hồi!");
      return;
    }
    setReplyCommentId(commentId);
    setReplyModalVisible(true);
  };

  const handleReplySubmit = () => {
    if (replyCommentId && replyText.trim() !== "") {
      sendReply({ id: replyCommentId, reply: replyText });
    } else {
      toast.warning("Vui lòng nhập nội dung phản hồi");
    }
  };

  const data =
    comments &&
    comments?.data?.data?.data?.map((item: any, index: number) => {
      const isHidden =
        item.isActive === 0 || item.isActive === "0" || item.isActive === false;
      const isManuallyHidden = hiddenComments[item.id] ?? isHidden;
      return {
        key: item.id,
        child: item.children,
        stt: item.id,
        content: isManuallyHidden ? (
          <span className="text-gray-400">Comment ẩn</span>
        ) : (
          item.content
        ),
        product_id: item.product_id,
        rating: item.rating,
        user_id: item.user_id,
        reply: item.reply ? (
          <Tag color="blue">{item.reply}</Tag>
        ) : (
          <Tag color="red">Chưa phản hồi</Tag>
        ),
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
            {/* <Link to={`/dashboard/commentsValue/${item.id}`}>
              <MyButton>Comments Value</MyButton>
            </Link> */}
            <MyButton
              danger={isManuallyHidden}
              onClick={() => toggleCommentVisibility(item.id)}
              type="primary"
            >
              {isManuallyHidden ? "Hiện" : "Ẩn"}
            </MyButton>
            <Link
              to={`/dashboard/comments/${item.id}`}
              className="text-blue-500"
            >
              <MyButton type="dashed">Detail</MyButton>
            </Link>
            <MyButton
              type="primary"
              onClick={() => openReplyModal(item.id, item.reply)}
            >
              Reply
            </MyButton>
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <div className="mb-3">
        <MyButton
          danger
          className="mb-3 ml-2"
          onClick={handleDeleteSelectedData}
        >
          Delete Selected
        </MyButton>
        <MyButton danger className="ml-2" onClick={toggleSelectedComments}>
          {selectAllHidden
            ? "Hiện các comment đã chọn"
            : "Ẩn các comment đã chọn"}
        </MyButton>
      </div>

      {/* <Link to={`/dashboard/comments/add`}>
        <MyButton type="primary" className="mb-3">
          Add
        </MyButton>
      </Link> */}
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
      <Modal
        title="Phản hồi bình luận"
        open={replyModalVisible}
        onCancel={() => setReplyModalVisible(false)}
        onOk={handleReplySubmit}
      >
        <Input.TextArea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Nhập phản hồi của bạn..."
          rows={4}
        />
      </Modal>
    </React.Fragment>
  );
};

export default CommentAdmin;

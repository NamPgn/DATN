/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MyButton } from "../../../components/UI/Core/Button";
import MVTable from "../../../components/UI/Core/MV/Table";
import {
  delMultipleComments,
  hiddenComment,
  replyComment,
  statusMutipleComment,
} from "../../../sevices/comment";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Input, Modal, Tag } from "antd";
import { columnsComments } from "../../../constant";
import { Link } from "react-router-dom";

const HiddenComment = () => {
  const [page, setPage] = useState(1);
  const [replyText, setReplyText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
  const [replyModalVisible, setReplyModalVisible] = useState(false);

  const { data: comments, refetch } = useQuery({
    queryKey: ["hidden-comments"],
    queryFn: hiddenComment,
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

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

  const { mutate: restoreComments } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await statusMutipleComment({ id: ids, status: true });
    },
    onSuccess: () => {
      toast.success("Khôi phục comment thành công");
      setSelectedRowKeys([]);
      refetch();
    },
    onError: () => {
      toast.error("Khôi phục thất bại");
    },
  });

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const handleRestoreSelected = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất 1 comment để khôi phục!");
      return;
    }
    restoreComments(selectedRowKeys);
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
    comments?.data?.data?.data?.map((item: any) => ({
      key: item.id,
      content: <span className="text-gray-400">{item.content}</span>,
      product_id: item.product_id,
      rating: item.rating,
      stt: item.id,
      user_id: item.user_id,
      reply: item.reply ? (
        <Tag color="blue">{item.reply}</Tag>
      ) : (
        <Tag color="red">Chưa phản hồi</Tag>
      ),
      is_active: <Tag color="warning">Hidden</Tag>,
      action: (
        <div className="d-flex gap-1">
          <Link to={`/dashboard/comments/${item.id}`} className="text-blue-500">
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
    }));

  return (
    <React.Fragment>
      <h1>Danh sách comment bị ẩn</h1>

      <MyButton danger className="mb-3 ml-2" onClick={handleDeleteSelectedData}>
        Delete Selected
      </MyButton>
      <MyButton type="primary" onClick={handleRestoreSelected} className="mb-3">
        Hiện lại các comment đã chọn
      </MyButton>
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

      <Link to="/dashboard/comments">
        <MyButton type="primary">Quay lại danh sách bình luận</MyButton>
      </Link>
    </React.Fragment>
  );
};

export default HiddenComment;

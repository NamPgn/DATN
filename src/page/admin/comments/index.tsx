/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Modal, Select, Tag } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  delComments,
  delMultipleComments,
  getComments,
  replyComment,
  searchComment,
  statusMutipleComment,
} from "../../../sevices/comment";
import { MyButton } from "../../../components/UI/Core/Button";
import MVConfirm from "../../../components/UI/Core/Confirm";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsComments } from "../../../constant";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const CommentAdmin = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [hiddenComments, setHiddenComments] = useState<Record<string, boolean>>(
    {}
  );
  const [selectAllHidden, setSelectAllHidden] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchRating, setSearchRating] = useState<number | undefined>(
    undefined
  );
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: comments, refetch }: any = useQuery({
    queryKey: ["comments", page, searchKeyword, searchRating],
    queryFn: async () => {
      if (searchKeyword || searchRating !== undefined) {
        return await searchComment(searchKeyword, searchRating);
      }
      return await getComments(page);
    },
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

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };
  const { mutate: deleteMultiple } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await delMultipleComments(ids);
    },
    onSuccess: () => {
      toast.success("Xóa nhiều comment thành công");
      setSelectedRowKeys([]);
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

  const toggleSelectedComments = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một comment");
      return;
    }

    const allHidden = selectedRowKeys.every(
      (id: string | number) => hiddenComments[id]
    );

    setHiddenComments((prev) => {
      const updatedHidden = { ...prev };
      selectedRowKeys.forEach((id: string | number) => {
        updatedHidden[id] = !allHidden;
      });
      return updatedHidden;
    });
    const data = {
      id: selectedRowKeys,
      status: !!allHidden,
    };
    statusMutipleComment(data)
      .then(() => {
        toast.success("Cập nhật trạng thái thành công");
        refetch();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái:", error);
        toast.error("Cập nhật trạng thái thất bại");
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

  const handleSearch = () => {
    setSearchKeyword(searchInput);
    setPage(1);
    refetch();
  };

  const data =
    comments &&
    comments?.data?.data?.data?.map((item: any) => {
      const isHidden =
        item.status === 0 || item.status === "0" || item.status === false;
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
          item.status == 0 ? (
            <Tag color="warning">Hidden</Tag>
          ) : (
            <Tag color="success">Active</Tag>
          ),
        action: (
          <div className="d-flex gap-1">
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton danger className="ml-2">
                Delete
              </MyButton>
            </MVConfirm>
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
      <div className="d-flex gap-2 mb-4">
        <Input
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: "200px" }}
        />
        <MyButton
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Tìm kiếm
        </MyButton>
        <Select
          placeholder="Chọn rating"
          value={searchRating}
          onChange={(value) => setSearchRating(value)}
          style={{ width: "120px" }}
          allowClear
        >
          <Option value={1}>1 sao</Option>
          <Option value={2}>2 sao</Option>
          <Option value={3}>3 sao</Option>
          <Option value={4}>4 sao</Option>
          <Option value={5}>5 sao</Option>
        </Select>
        <MyButton type="primary" onClick={handleSearch}>
          Tìm kiếm
        </MyButton>
      </div>
      <div className="mb-3">
        <MyButton
          color="default"
          variant="dashed"
          icon={<DeleteOutlined />}
          onClick={handleDeleteSelectedData}
        >
          Delete Selected
        </MyButton>
        <MyButton
          icon={<EyeInvisibleOutlined />}
          className="ml-2"
          onClick={toggleSelectedComments}
        >
          {selectAllHidden
            ? "Hiện các comment đã chọn"
            : "Ẩn các comment đã chọn"}
        </MyButton>
        <Link to="/dashboard/comments/hidden">
          <MyButton type="default">Danh sách comment ẩn</MyButton>
        </Link>
      </div>

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

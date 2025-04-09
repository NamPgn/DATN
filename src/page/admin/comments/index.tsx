/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  delMultipleComments,
  getComments,
  replyComment,
} from "../../../sevices/comment";
import { MyButton } from "../../../components/UI/Core/Button";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsComments } from "../../../constant";
import {
  SearchOutlined,
} from "@ant-design/icons";
import TailwindComponent from "../../../components/Tailwind/TailwinComponent";
const { Option } = Select;
const CommentAdmin = () => {
  const [page, setPage] = useState(1);

  const [searchStatusInput, setSearchStatusInput] = useState<string>("all");
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchRating, setSearchRating] = useState<number | undefined>(
    undefined
  );
  const [searchKeywordInput, setSearchKeywordInput] = useState("");
  const [searchRatingInput, setSearchRatingInput] = useState<
    number | undefined
  >(undefined);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: comments, refetch }: any = useQuery({
    queryKey: ["comments", page, searchKeyword, searchRating, searchStatusInput],
    queryFn: async () => {
      return await getComments(
        page,
        searchKeyword.trim() !== "" ? searchKeyword : undefined,
        searchRating ?? undefined,
        searchStatusInput
      );
    },
  });
  console.log(searchStatusInput);
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
    setSearchKeyword(searchKeywordInput);
    setSearchRating(searchRatingInput);
    setPage(1);
  };
  const data =
    comments &&
    comments?.data?.data?.data?.map((item: any) => {
      return {
        key: item.id,
        stt: item.id,
        reviewer_name: item.reviewer_name,
        reviewer_email: item.reviewer_email,
        rating: (
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${index < item.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        ),
        content: item.content_preview,
        is_active: item.is_active ? (
          <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            Active
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
            Hidden
          </span>
        ),
        has_reply: item.has_reply ? (
          <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
            Replied
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
            No Reply
          </span>
        ),
        created_at: item.created_at,
        action: (
          <div className="flex items-center space-x-2">
            <Link
              to={`/dashboard/comments/${item.id}`}
              className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
            >
              Detail
            </Link>
          </div>
        ),
      };
    });
  return (
    <TailwindComponent>
      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchKeywordInput}
          onChange={(e) => setSearchKeywordInput(e.target.value)}
          style={{ width: "200px" }}
        />

        <Select
          placeholder="Chọn rating"
          value={searchRatingInput}
          onChange={(value) => setSearchRatingInput(value)}
          style={{ width: "120px" }}
          allowClear
        >
          <Option value={1}>1 sao</Option>
          <Option value={2}>2 sao</Option>
          <Option value={3}>3 sao</Option>
          <Option value={4}>4 sao</Option>
          <Option value={5}>5 sao</Option>
        </Select>

        <MyButton
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Tìm kiếm
        </MyButton>

        <Select
          placeholder="Trạng thái hiển thị"
          value={searchStatusInput}
          onChange={(value) => setSearchStatusInput(value)}
          style={{ width: "180px" }}
          allowClear
        >
          <Option value="all">Tất cả bình luận</Option>
          <Option value="1">Đang hiển thị</Option>
          <Option value="0">Đang bị ẩn</Option>
        </Select>
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
    </TailwindComponent>
  );
};

export default CommentAdmin;

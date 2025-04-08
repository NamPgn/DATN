import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getComment, replyComment, changeStatusComment } from "../../../sevices/comment";
import { MyButton } from "../../../components/UI/Core/Button";
import TailwindComponent from "../../../components/Tailwind/TailwinComponent";
import { Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const CommentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [banReason, setBanReason] = useState("");
  const [banModalVisible, setBanModalVisible] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(["commentDetail", id], () =>
    getComment(id!)
  );

  const { mutate: sendReply, isLoading: isLoadingReply } = useMutation({
    mutationFn: async ({ reply }: { reply: string }) => {
      return await replyComment(id!, reply);
    },
    onSuccess: () => {
      toast.success("Phản hồi thành công!");
      setReplyModalVisible(false);
      setReplyText("");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi phản hồi:", error);
      toast.error("Phản hồi thất bại");
    },
  });

  const { mutate: changeStatus, isLoading: isLoadingStatus } = useMutation({
    mutationFn: async ({ status, reason }: { status: boolean; reason?: string }) => {
      return await changeStatusComment(id!, status, reason);
    },
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công!");
      setBanReason("");
      setBanModalVisible(false);
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Cập nhật trạng thái thất bại");
    },
  });

  const handleReplySubmit = () => {
    if (replyText.trim() !== "") {
      sendReply({ reply: replyText });
    } else {
      toast.warning("Vui lòng nhập nội dung phản hồi");
    }
  };

  const handleBanSubmit = () => {
    if (banReason.trim() === "") {
      toast.warning("Vui lòng nhập lý do ẩn bình luận");
      return;
    }
    changeStatus({ status: false, reason: banReason });
  };

  const handleStatusChange = (status: boolean) => {
    if (!status) {
      setBanModalVisible(true);
    } else {
      Modal.confirm({
        title: "Xác nhận hiển thị bình luận",
        content: "Bạn có chắc chắn muốn hiển thị bình luận này?",
        okText: "Xác nhận",
        cancelText: "Hủy",
        onOk: () => {
          changeStatus({ status });
        },
      });
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (isError) return <div className="p-4 text-red-600 bg-red-100 rounded-lg">Lỗi khi tải bình luận</div>;

  const comment = data?.data?.data;

  return (
    <TailwindComponent>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Chi tiết bình luận</h1>
            <div className="flex gap-2">
              {comment?.moderation?.is_active ? (
                <MyButton
                  type="primary"
                  danger
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => handleStatusChange(false)}
                  loading={isLoadingStatus}
                >
                  Ẩn bình luận
                </MyButton>
              ) : (
                <MyButton
                  type="primary"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => handleStatusChange(true)}
                  loading={isLoadingStatus}
                >
                  Hiển thị bình luận
                </MyButton>
              )}
              {comment?.moderation?.reply === null && (
                <MyButton
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    setReplyModalVisible(true);
                  }}
                >
                  Trả lời bình luận
                </MyButton>
              )}
            </div>
          </div>
          
          {/* User Information */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={comment.avatar} 
                alt={comment.reviewer_name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{comment.reviewer_name}</h2>
                <p className="text-gray-600">{comment.reviewer_email}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {comment.user_type}
                </span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < comment.review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">{comment.review.created_at}</span>
            </div>
            <p className="text-gray-700 mb-4">{comment.review.content}</p>
            
            {/* Review Images */}
            {comment.review.images && comment.review.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {comment.review.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Thông tin sản phẩm</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tên sản phẩm:</p>
                <p className="font-medium">{comment.product.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SKU:</p>
                <p className="font-medium">{comment.product.sku || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Giá:</p>
                <p className="font-medium">{comment.product.price ? `${comment.product.price}đ` : 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Moderation Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Trạng thái kiểm duyệt</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Trạng thái:</p>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  comment.moderation.is_active 
                    ? 'text-green-800 bg-green-100' 
                    : 'text-red-800 bg-red-100'
                }`}>
                  {comment.moderation.is_active ? 'Đang hiển thị' : 'Đã ẩn'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lý do ẩn:</p>
                <p className="font-medium">{comment.moderation.hidden_reason || 'Không có'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phản hồi:</p>
                <p className="font-medium">{comment.moderation.reply || 'Chưa có phản hồi'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Thời gian phản hồi:</p>
                <p className="font-medium">{comment.moderation.reply_at || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <MyButton 
              type="primary" 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Quay lại
            </MyButton>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      <Modal
        title="Trả lời bình luận"
        open={replyModalVisible}
        onCancel={() => {
          setReplyModalVisible(false);
          setReplyText("");
        }}
        onOk={handleReplySubmit}
        okText="Gửi phản hồi"
        cancelText="Hủy"
        confirmLoading={isLoadingReply}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung phản hồi
          </label>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Nhập nội dung phản hồi của bạn..."
          />
        </div>
      </Modal>

      {/* Ban Modal */}
      <Modal
        title="Ẩn bình luận"
        open={banModalVisible}
        onCancel={() => {
          setBanModalVisible(false);
          setBanReason("");
        }}
        onOk={handleBanSubmit}
        okText="Xác nhận"
        cancelText="Hủy"
        confirmLoading={isLoadingStatus}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lý do ẩn bình luận
          </label>
          <textarea
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Nhập lý do ẩn bình luận..."
          />
        </div>
      </Modal>
    </TailwindComponent>
  );
};

export default CommentDetail;

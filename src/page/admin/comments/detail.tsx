import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Card, Spin, Alert, Tag } from "antd";
import { getComment } from "../../../sevices/comment";
import { MyButton } from "../../../components/UI/Core/Button";

const CommentDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery(["commentDetail", id], () =>
    getComment(id!)
  );

  if (isLoading) return <Spin size="large" />;
  if (isError) return <Alert message="Lỗi khi tải bình luận" type="error" />;

  const comment = data?.data?.data;

  return (
    <Card
      title="Chi tiết bình luận"
      style={{ maxWidth: 600, margin: "20px auto" }}
    >
      <p>
        <strong>ID:</strong> {comment.id}
      </p>
      <p>
        <strong>Nội dung:</strong> {comment.content}
      </p>
      <p>
        <strong>Người dùng:</strong> {comment.user_id}
      </p>
      <p>
        <strong>Sản phẩm:</strong> {comment.product_id}
      </p>
      <p>
        <strong>Đánh giá:</strong> {comment.rating} ⭐
      </p>
      <p>
        <strong>Phản hồi bình luận:</strong> {comment.reply}
      </p>
      <p>
        <strong>Trạng thái:</strong>
        {comment.isActive === 0 ? (
          <Tag color="warning">Hidden</Tag>
        ) : (
          <Tag color="success">Active</Tag>
        )}
      </p>
      <MyButton type="primary" onClick={() => window.history.back()}>
        Quay lại
      </MyButton>
    </Card>
  );
};

export default CommentDetail;

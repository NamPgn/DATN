/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import {
  addCommentClient,
  getCommentClient,
} from "../../../sevices/client/comment";

const Description = ({ product }: any) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?.id) return;

      setLoading(true);
      try {
        const response = await getCommentClient(product.id, page);
        setReviews(response.data.data);
      } catch (error) {
        console.error("Lỗi hiển thị danh sách đánh giá", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product?.id, page]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };
  const handleSubmitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!product?.id) return;

    const commentData = {
      product_id: product.id,
      user_id: 1,
      rating: formData.rating,
      content: formData.comment,
    };

    setSubmitting(true);
    try {
      const response = await addCommentClient(commentData);
      alert(response.data.message);

      setReviews((prevReviews) => [response.data.data, ...prevReviews]);
      setFormData({ rating: 0, comment: "", name: "", email: "" });
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="row productContentRow">
      <div className="productOpenTab">
        <h4 className="potTitle">Mô Tả</h4>
        <div className="productDescContentArea">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="descriptionContent"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="productOpenTab">
        <h4 className="potTitle">Đánh Giá</h4>
        <div className="productReviewArea">
          <div className="row">
            <div className="col-lg-6">
              <h3>{reviews.length} Đánh Giá</h3>
              {loading ? (
                <p>Loading reviews...</p>
              ) : (
                <div className="reviewList">
                  <ol>
                    {reviews.map((review) => (
                      <li key={review.id}>
                        <div className="postReview">
                          {review.avatar ? (
                            <img src={review.avatar} alt="User Avatar" />
                          ) : (
                            <i className="fa-solid fa-user default-user-icon"></i>
                          )}
                          <h2>{review.username || "Anonymous"}</h2>
                          <div className="postReviewContent">
                            {review.content}
                          </div>
                          <div className="productRatingWrap">
                            <div className="star-rating">
                              {[...Array(review.rating)].map((_, index) => (
                                <span key={index} className="filled-star">
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="reviewMeta">
                            <h4>{review.username || "Unknown"}</h4>
                            <span>on {review.created_at}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="col-lg-6">
              <div className="commentFormArea">
                <h3>Thêm đánh giá</h3>
                <div className="reviewFrom">
                  <form onSubmit={handleSubmitComment} className="row">
                    <div className="col-lg-12">
                      <textarea
                        name="comment"
                        placeholder="Viết đánh giá của bạn"
                        value={formData.comment}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-lg-12">
                      <div className="reviewStar">
                        <label>Đánh giá của bạn</label>
                        <div className="rsStars">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className="star"
                              onClick={() => handleRatingChange(index + 1)}
                              style={{
                                cursor: "pointer",
                                fontSize: "24px",
                                color:
                                  formData.rating > index ? "gold" : "gray",
                              }}
                            >
                              {formData.rating > index ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="ulinaBTN"
                        disabled={submitting}
                      >
                        <span className="ulinaBTNText">
                          {submitting ? "Đang gửi..." : "Gửi Ngay"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import {
  addCommentClient,
  getCommentClient,
} from "../../../sevices/client/comment";
import { useGetStaticReview } from "../../../hook/review";
import { useParams } from "react-router-dom";

// Helper function to format date and time
const formatDateTime = (dateString: string | undefined) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    // Format like: YYYY-MM-DD HH:mm:ss
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if formatting fails
  }
};

const Description = ({ product }: any) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data, isLoading } = useGetStaticReview(id);
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

  return (
    <div className="descSec">
      <div className="container">
        <div className="tabContent">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="descriptionContent"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description),
                }}
              ></div>
              {reviews && reviews.length > 0 && (
                <div className="reviewList mt-8 space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>
                  <ol className="space-y-6">
                    {reviews.map((review) => (
                      <li key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {review.avatar ? (
                              <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={review.avatar}
                                alt="User Avatar"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <i className="fa-solid fa-user text-gray-600"></i>
                              </div>
                            )}
                          </div>

                          <div className="flex-grow">
                            <div className="flex item-center justify-between"> <p className="font-semibold text-sm">{review.name || ""}</p>
                              {review.is_updated && (
                                <p className="text-xs text-gray-400 mt-2 italic">Đã chỉnh sửa</p>
                              )}</div>
                            <div className="flex items-center space-x-2 my-1">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, index) => (
                                  <span key={index} className="text-lg">
                                    {index < review.rating ? '★' : '☆'}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mb-2 flex space-x-3">
                              <span>{formatDateTime(review.updated_at)}</span>
                              {review.variation && (() => {
                                try {
                                  const parsed = JSON.parse(review.variation);
                                  const variationString = Object.entries(parsed)
                                    .map(([key, value]: any) => `${key}: ${value}`)
                                    .join(', ');
                                  return <span>Phân loại hàng: {variationString}</span>;
                                } catch (error) {
                                  console.error("Lỗi parse variation:", error);
                                  return null;
                                }
                              })()}
                            </div>

                            <p className="text-sm mb-3">{review.content}</p>

                            {review.images && review.images.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {review.images.map((image: string, index: number) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`Review image ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded border cursor-pointer"
                                  // Add onClick handler for lightbox/modal if needed
                                  />
                                ))}
                              </div>
                            )}

                            {review.reply && (
                              <div className="bg-gray-100 p-3 rounded-md my-3">
                                <p className="text-sm font-semibold text-gray-700">Phản hồi từ Người bán</p>
                                <p className="text-xs text-gray-500 mb-1">{formatDateTime(review.reply_at)}</p>
                                <p className="text-sm text-gray-800">{review.reply}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="col-lg-6">
              <div className="mt-8 p-4 border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">{data.average_rating.toFixed(1)} trên 5</span>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className={`text-yellow-500 ${index < data.average_rating ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                </div>
                <div className="mt-2 text-gray-600">
                  <span>{data.total_reviews} Đánh Giá</span>
                </div>
                <div className="mt-2 flex space-x-2">
                  {Object.entries(data.ratings).map(([key, value]) => (
                    <button key={key} className="bg-gray-200 text-gray-700 rounded-md px-3 py-1 hover:bg-gray-300 focus:outline-none">
                      {key} Sao ({value})
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-gray-600">
                  <span>Có Hình Ảnh/Video ({data.with_images})</span>
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

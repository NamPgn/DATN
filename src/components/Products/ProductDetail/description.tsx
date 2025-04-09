/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import {
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
  const [activeFilter, setActiveFilter] = useState<{
    rating?: number;
    has_images?: boolean;
  }>({});
  const { id } = useParams();
  const { data, isLoading } = useGetStaticReview(id);

  const handleFilterChange = (filter: { rating?: number; has_images?: boolean }) => {
    setActiveFilter(filter);
    setPage(1); // Reset page when changing filters
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?.id) return;

      setLoading(true);
      try {
        const response = await getCommentClient(
          product.id, 
          page,
          activeFilter.rating,
          activeFilter.has_images
        );
        setReviews(response.data.data);
      } catch (error) {
        console.error("Lỗi hiển thị danh sách đánh giá", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product?.id, page, activeFilter.rating, activeFilter.has_images]); // Add has_images dependency

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="descSec">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - Reviews */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm">
              <div
                className="prose max-w-none p-6"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description),
                }}
              ></div>

              {reviews && reviews.length > 0 ? (
                <div className="p-6 border-t border-gray-100">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Đánh giá sản phẩm</h3>
                      <div className="text-sm text-gray-500">
                        {data?.total_reviews || 0} đánh giá
                      </div>
                    </div>

                    {/* Reviews List */}
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
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-sm">{review.name || ""}</p>
                                  <p className="text-xs text-gray-500">{review.email || ""}</p>
                                </div>
                                {review.is_updated && (
                                  <p className="text-xs text-gray-400 italic">Đã chỉnh sửa</p>
                                )}
                              </div>
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
                </div>
              ) : (
                <div className="p-6 border-t border-gray-100">
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <i className="fas fa-comment-slash text-4xl mb-4"></i>
                    <p>Chưa có đánh giá nào cho sản phẩm này</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Statistics and Filters */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 mb-8">
              <h3 className="text-lg font-semibold mb-4">Thống kê đánh giá</h3>
              
              {/* Overall Rating */}
              <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-500 mr-4">
                  {data?.average_rating?.toFixed(1) || 0}
                </div>
                <div className="flex flex-col">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className={`${index < Math.round(data?.average_rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{data?.total_reviews || 0} đánh giá</span>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => handleFilterChange({})}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    Object.keys(activeFilter).length === 0
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tất cả ({data?.total_reviews || 0})
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange({ rating })}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      activeFilter.rating === rating
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rating} Sao ({data?.ratings?.[rating] || 0})
                  </button>
                ))}
                <button
                  onClick={() => handleFilterChange({ has_images: true })}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    activeFilter.has_images === true
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Có hình ảnh ({data?.with_images || 0})
                </button>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                <div className="text-sm text-gray-500 mb-2">Phân bố đánh giá</div>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div
                    key={rating}
                    className="flex items-center group p-2"
                  >
                    <div className="flex items-center text-sm text-gray-600 w-16">
                      <span className="mr-1">{rating}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ 
                          width: `${((data?.ratings?.[rating] || 0) / (data?.total_reviews || 1)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-10 text-right">
                      {data?.ratings?.[rating] || 0}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hidden Comments Info */}
              {data?.hidden_comments > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-eye-slash mr-2"></i>
                    <span>{data.hidden_comments} đánh giá bị ẩn do vi phạm chính sách</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;

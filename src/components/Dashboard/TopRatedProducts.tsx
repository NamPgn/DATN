import React from 'react';
import { Bar } from 'react-chartjs-2';

interface TopRatedProductsProps {
  topRatedProducts: Array<{
    id: number;
    name: string;
    avg_rating: number;
    total_reviews: number;
  }>;
}

const TopRatedProducts: React.FC<TopRatedProductsProps> = ({ topRatedProducts }) => {
  const chartData = {
    labels: topRatedProducts?.map((p) =>
      p.name.length > 20 ? p.name.substring(0, 20) + "..." : p.name
    ),
    datasets: [
      {
        label: "Số lượng đánh giá",
        data: topRatedProducts?.map((p) => p.total_reviews),
        backgroundColor: "#ffcd56",
      },
      {
        label: "Điểm đánh giá trung bình",
        data: topRatedProducts?.map((p) => p.avg_rating),
        backgroundColor: "#4bc0c0",
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Top 5 sản phẩm được đánh giá cao nhất
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TopRatedProducts; 
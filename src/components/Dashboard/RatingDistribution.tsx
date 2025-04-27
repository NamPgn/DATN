import React from 'react';
import { Pie } from 'react-chartjs-2';

interface RatingDistributionProps {
  ratingStatistics: Array<{
    rating: number;
    total_reviews: number;
  }>;
}

const RatingDistribution: React.FC<RatingDistributionProps> = ({ ratingStatistics }) => {
  const chartData = {
    labels: ratingStatistics?.map((r) => `Rating ${r.rating}`),
    datasets: [
      {
        data: ratingStatistics?.map((r) => r.total_reviews),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Phân bố đánh giá
      </h2>
      <Pie data={chartData} />
    </div>
  );
};

export default RatingDistribution; 
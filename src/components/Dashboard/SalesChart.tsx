import React from 'react';
import { Line } from 'react-chartjs-2';

interface SalesChartProps {
  salesStatistics: Array<{
    date: string;
    totalRevenue: number;
    totalOrders: number;
  }>;
}

const SalesChart: React.FC<SalesChartProps> = ({ salesStatistics }) => {
  const chartData = {
    labels: salesStatistics?.map((s) => {
      const date = new Date(s.date);
      return date.toLocaleDateString("vi-VN");
    }) || [],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: salesStatistics?.map((s) => s.totalRevenue) || [],
        borderColor: "#4bc0c0",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Số đơn hàng",
        data: salesStatistics?.map((s) => s.totalOrders) || [],
        borderColor: "#ff6384",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  if (!salesStatistics?.length) {
    return (
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Biểu đồ doanh số bán hàng
        </h2>
        <div className="text-center text-gray-500 py-8">
          Không có dữ liệu doanh số trong khoảng thời gian này
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Biểu đồ doanh số bán hàng
      </h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default SalesChart;
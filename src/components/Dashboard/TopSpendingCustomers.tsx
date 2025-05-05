import React from 'react';
import { Bar } from 'react-chartjs-2';

interface TopSpendingCustomersProps {
  topUsersBySpending: Array<{
    user_id: number;
    total_spent: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
  }>;
}

const TopSpendingCustomers: React.FC<TopSpendingCustomersProps> = ({ topUsersBySpending }) => {
  const chartData = {
    labels: topUsersBySpending?.map((u) => u.user.name || u.user.email) || [],
    datasets: [
      {
        label: "Tổng chi tiêu (VNĐ)",
        data: topUsersBySpending?.map((u) => u.total_spent) || [],
        backgroundColor: "#ff6384",
      },
    ],
  };

  if (!topUsersBySpending?.length) {
    return (
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          Top 5 khách hàng chi tiêu nhiều nhất
        </h2>
        <div className="text-center text-gray-500 py-8">
          Chưa có dữ liệu chi tiêu của khách hàng
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Top 5 khách hàng chi tiêu nhiều nhất
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TopSpendingCustomers; 
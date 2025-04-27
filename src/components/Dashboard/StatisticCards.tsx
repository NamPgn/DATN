import React from 'react';

interface StatisticCardsProps {
  fixedStats: {
    totalCategories: number;
    totalProducts: number;
    totalUsers: number;
    totalOrders: number;
  };
  timeBasedStats: {
    totalRevenue: number;
  };
}

const StatisticCards: React.FC<StatisticCardsProps> = ({ fixedStats, timeBasedStats }) => {
  const stats = [
    {
      label: "Tổng danh mục",
      value: fixedStats?.totalCategories,
      color: "text-blue-500",
    },
    {
      label: "Tổng sản phẩm",
      value: fixedStats?.totalProducts,
      color: "text-green-500",
    },
    {
      label: "Tổng người dùng",
      value: fixedStats?.totalUsers,
      color: "text-red-500",
    },
    {
      label: "Tổng đơn hàng",
      value: fixedStats?.totalOrders,
      color: "text-yellow-400",
    },
    {
      label: "Tổng doanh thu",
      value: timeBasedStats?.totalRevenue?.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }) || "0 ₫",
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6 w-full">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <h2 className="text-lg font-semibold text-gray-700">{item.label}</h2>
          <p className={`text-2xl font-bold ${item.color}`}>
            {item.value ?? "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatisticCards;

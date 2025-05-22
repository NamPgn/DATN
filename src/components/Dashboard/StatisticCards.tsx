import React from "react";

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

const StatisticCards: React.FC<StatisticCardsProps> = ({
  fixedStats,
  timeBasedStats,
}) => {
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
      value:
        Number(timeBasedStats?.totalRevenue || 0).toLocaleString("vi-VN") +
        " ₫",
      color: "text-green-500",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-6 w-full">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex-1 min-w-0 bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-28 transition-transform transform hover:scale-105"
        >
          <h2 className="text-lg font-semibold text-gray-700 text-center">
            {item.label}
          </h2>
          <p className={`text-2xl font-bold ${item.color} text-center`}>
            {item.value ?? "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatisticCards;

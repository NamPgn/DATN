/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { useQuery } from "react-query";
import { dashboard } from "../../sevices";
import OrdersNotify from "../../components/UI/Notification";
import { useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const [isLast7Days, setIsLast7Days] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, isLoading }: any = useQuery({
    queryKey: ["Orders", year],
    queryFn: async () => {
      return (await dashboard(year)).data?.data;
    },
  });

  const categoryByProductData = {
    labels: data?.productByCategory.map((c: any) => c.name),
    datasets: [
      {
        label: "Total Products",
        data: data?.productByCategory.map((c: any) => c.total_products),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  const topSellingData = {
    labels: data?.topSellingProducts.map((p: any) =>
      p.product ? p.product.name : `Product ${p.product_id}`
    ),
    datasets: [
      {
        label: "Total Sold",
        data: data?.topSellingProducts.map((p: any) => p.total_sold),
        backgroundColor: "#36a2eb",
      },
    ],
  };

  const ratingData = {
    labels: data?.ratingStatistics.map((r: any) => `Rating ${r.rating}`),
    datasets: [
      {
        data: data?.ratingStatistics.map((r: any) => r.total_reviews),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  if (isLoading) {
    return (
      <TailwindComponent>
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-gray-500 text-lg">Đang tải dữ liệu...</div>
        </div>
      </TailwindComponent>
    );
  }

  return (
    <TailwindComponent>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Dashboard</h1>
        <div className="flex items-center gap-4 mb-3">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-4 py-2 rounded-md border border-gray-300"
          >
            {[...Array(5)].map((_, i) => {
              const currentYear = new Date().getFullYear() - i;
              return (
                <option key={currentYear} value={currentYear}>
                  {currentYear}
                </option>
              );
            })}
          </select>

          <button
            onClick={() => setIsLast7Days(!isLast7Days)}
            className={`px-4 py-2 rounded-md text-white transition ${
              isLast7Days
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {isLast7Days ? "Xem tất cả" : "Xem 7 ngày gần nhất"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
          {[
            {
              label: "Tổng danh mục",
              value: data?.totalCategories,
              color: "text-blue-500",
            },
            {
              label: "Tổng sản phẩm",
              value: data?.totalProducts,
              color: "text-green-500",
            },
            {
              label: "Tổng người dùng",
              value: data?.totalUsers,
              color: "text-red-500",
            },
            { label: "Tổng đơn hàng", color: "text-yellow-400" },
            {
              label: "Tổng doanh thu",
              value: Number(data?.totalRevenue).toLocaleString("Vi-VN", {
                style: "currency",
                currency: "VND",
              }),
              color: "text-green-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {item.label}
              </h2>
              <p className={`text-2xl font-bold ${item.color}`}>
                {item.value ?? "N/A"}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Phân bố sản phẩm theo danh mục
            </h2>
            <Doughnut data={categoryByProductData} />
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Top 5 Sản phẩm bán chạy
            </h2>
            <Bar data={topSellingData} />
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Phân bố đánh giá
            </h2>
            <Pie data={ratingData} />
          </div>
        </div>
      </div>
      <OrdersNotify />
    </TailwindComponent>
  );
};

export default Dashboard;

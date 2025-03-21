import React from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { useQuery } from "react-query";
import { dashboard } from "../../sevices";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const { data }: any = useQuery({
    queryKey: ["Orders", ],
    queryFn: async () => {
      return (await dashboard()).data?.data;
    },
  });

  const overviewData = {
    labels: ["Categories", "Products", "Users", "Vouchers"],
    datasets: [
      {
        data: [data?.totalCategories, data?.totalProducts, data?.totalUsers, data?.totalVouchers],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  const topSellingData = {
    labels: data?.topSellingProducts.map((p:any) => (p.product ? p.product.name : `Product ${p.product_id}`)),
    datasets: [
      {
        label: "Total Sold",
        data: data?.topSellingProducts.map((p:any) => p.total_sold),
        backgroundColor: "#36a2eb",
      },
    ],
  };

  const ratingData = {
    labels: data?.ratingStatistics.map((r:any) => `Rating ${r.rating}`),
    datasets: [
      {
        data: data?.ratingStatistics.map((r:any) => r.total_reviews),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  const categoryData = {
    labels: data?.productByCategory.map((c:any) => c.name),
    datasets: [
      {
        label: "Total Products",
        data: data?.productByCategory.map((c:any) => c.total_products),
        backgroundColor: "#ffcd56",
      },
    ],
  };

  return (
    <TailwindComponent>
      <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Categories</h2>
          <p className="text-2xl font-bold text-blue-500">{data?.totalCategories}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
          <p className="text-2xl font-bold text-green-500">{data?.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-red-500">{data?.totalUsers}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Overview</h2>
          <Doughnut data={overviewData} />
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Top Selling Products</h2>
          <Bar data={topSellingData} />
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Rating Distribution</h2>
          <Pie data={ratingData} />
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Products by Category</h2>
          <Bar data={categoryData} />
        </div>
      </div>
    </div>
    </TailwindComponent>
  );
};

export default Dashboard;
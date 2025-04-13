/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import TailwindComponent from "../../components/Tailwind/TailwinComponent";
import { useQuery } from "react-query";
import { dashboard } from "../../sevices";
import { useState } from "react";
import { DatePicker, Table } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title
);

const Dashboard = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { data, isLoading }: any = useQuery({
    queryKey: ["Orders", startDate, endDate],
    queryFn: async () => {
      return (await dashboard(startDate, endDate)).data?.data;
    },
  });

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    }
  };

  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf("day");
  };

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
  const salesChartData = {
    labels: data?.salesStatistics.map((s: any) => {
      const date = new Date(s.date);
      return date.toLocaleDateString("vi-VN");
    }),
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: data?.salesStatistics.map((s: any) => s.totalRevenue),
        borderColor: "#4bc0c0",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Số đơn hàng",
        data: data?.salesStatistics.map((s: any) => s.totalOrders),
        borderColor: "#ff6384",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const topSpendingData = {
    labels: data?.topUsersBySpending.map(
      (u: any) => u.user.name || u.user.email
    ),
    datasets: [
      {
        label: "Tổng chi tiêu (VNĐ)",
        data: data?.topUsersBySpending.map((u: any) => u.total_spent),
        backgroundColor: "#ff6384",
      },
    ],
  };

  const topRatedData = {
    labels: data?.topRatedProducts.map((p: any) =>
      p.name.length > 20 ? p.name.substring(0, 20) + "..." : p.name
    ),
    datasets: [
      {
        label: "Số lượng đánh giá",
        data: data?.topRatedProducts.map((p: any) => p.total_reviews),
        backgroundColor: "#ffcd56",
      },
      {
        label: "Điểm đánh giá trung bình",
        data: data?.topRatedProducts.map((p: any) => p.avg_rating),
        backgroundColor: "#4bc0c0",
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-700">Thống kê</h1>
          <div className="flex items-center gap-4 mb-3">
            <RangePicker
              onChange={handleRangeChange}
              defaultValue={[dayjs(startDate), dayjs(endDate)]}
              format="YYYY-MM-DD"
              allowClear={false}
              className="w-80"
              disabledDate={disabledDate}
            />
          </div>
        </div>

        {/* Thống kê cố định */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          {[
            {
              label: "Tổng danh mục",
              value: data?.totalCategories,
              icon: "📁",
            },
            {
              label: "Tổng sản phẩm",
              value: data?.totalProducts,
              icon: "📦",
            },
            {
              label: "Tổng người dùng",
              value: data?.totalUsers,
              icon: "👥",
            },
            {
              label: "Tổng Voucher",
              value: data?.totalVouchers,
              icon: "🎫",
            },
            {
              label: "Tổng đơn hàng",
              value: data?.totalOrders,
              icon: "📋",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{item.icon}</span>
                  <h2 className="text-gray-600 font-medium">{item.label}</h2>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {item.value ?? "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Thống kê đơn hàng theo trạng thái */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          {[
            {
              label: "Đơn hàng theo thời gian",
              value: data?.orderStatistics?.total_orders || 0,
              icon: "📊",
            },
            {
              label: "Đơn chờ xử lý",
              value: data?.orderStatistics?.pending_orders || 0,
              icon: "⏳",
            },
            {
              label: "Đơn đã xác nhận",
              value: data?.orderStatistics?.confirmed_orders || 0,
              icon: "✅",
            },
            {
              label: "Đơn hoàn thành",
              value: data?.orderStatistics?.completed_orders || 0,
              icon: "🎉",
            },
            {
              label: "Đơn đã hủy",
              value: data?.orderStatistics?.canceled_orders || 0,
              icon: "❌",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{item.icon}</span>
                  <h2 className="text-gray-600 font-medium">{item.label}</h2>
                </div>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Biểu đồ doanh số bán hàng
            </h2>
            <Line
              data={salesChartData}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Top 5 sản phẩm được đánh giá cao nhất
            </h2>
            <Bar data={topRatedData} />
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Top 5 khách hàng chi tiêu nhiều nhất
            </h2>
            <Bar data={topSpendingData} />
          </div>
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
            <Table
              columns={[
                {
                  title: "Tên sản phẩm",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Số lượng bán",
                  dataIndex: "quantity",
                  key: "quantity",
                  sorter: (a: any, b: any) => a.quantity - b.quantity,
                },
                {
                  title: "Doanh thu",
                  dataIndex: "revenue",
                  key: "revenue",
                  render: (text: any) => `${text.toLocaleString()} đ`,
                },
              ]}
              dataSource={
                topSellingData?.datasets?.[0]?.data?.map(
                  (value: any, index: any) => ({
                    key: index,
                    name: topSellingData.labels[index],
                    quantity: value,
                    revenue: value * 100000, // Giả định giá trị doanh thu
                  })
                ) || []
              }
              pagination={false}
              size="small"
            />
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Phân bố đánh giá
            </h2>
            <Pie data={ratingData} />
          </div>
        </div>
      </div>
    </TailwindComponent>
  );
};

export default Dashboard;

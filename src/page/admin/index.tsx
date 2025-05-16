/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useContext, useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import StatisticCards from "../../components/Dashboard/StatisticCards";
import SalesChart from "../../components/Dashboard/SalesChart";
import TopRatedProducts from "../../components/Dashboard/TopRatedProducts";
import TopSpendingCustomers from "../../components/Dashboard/TopSpendingCustomers";
import ProductCategories from "../../components/Dashboard/ProductCategories";
import TopSellingProducts from "../../components/Dashboard/TopSellingProducts";
import RatingDistribution from "../../components/Dashboard/RatingDistribution";
import OrderStatistics from "../../components/Dashboard/OrderStatistics";
import PurchaseRate from "../../components/Dashboard/PurchaseRate";
import TopSellingByDate from "../../components/Dashboard/TopSellingByDate";
import { UsersContext } from "../../context/usersContext";
import { toast } from "react-toastify";

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
  const { userId }: any = useContext(UsersContext) || {};
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", startDate, endDate],
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

  useEffect(() => {
    if (userId?.role === "staff") {
      toast.error("Bạn không có quyền truy cập vào trang này");
    }
  }, [userId]);

  if (isLoading) {
    return (
      <TailwindComponent>
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto w-full px-4 py-6">
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-gray-500 text-lg">Đang tải dữ liệu...</div>
            </div>
          </div>
        </div>
      </TailwindComponent>
    );
  }

  if (userId?.role === "staff") {
    return (
      <TailwindComponent>
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto w-full px-4 py-6">
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-gray-500 text-lg">Bạn không có quyền truy cập vào trang này</div>
            </div>
          </div>
        </div>
      </TailwindComponent>
    );
  }

  return (
    <TailwindComponent>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-4 py-6">
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

          <StatisticCards
            fixedStats={{
              totalCategories: data?.totalCategories,
              totalProducts: data?.totalProducts,
              totalUsers: data?.totalUsers,
              totalOrders: data?.totalOrders
            }}
            timeBasedStats={{
              totalRevenue: data?.totalRevenue
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <OrderStatistics orderStatistics={data?.orderStatistics} />
            <PurchaseRate 
              loginPurchaseRate={data?.loginPurchaseRate} 
              guestPurchaseRate={data?.guestPurchaseRate} 
            />
          </div>

          <div className="gap-6 mb-6">
            <SalesChart salesStatistics={data?.salesStatistics || []} />
          </div>

          <div className="gap-6 mb-6">
            <TopSellingByDate topSellingByDate={data?.topSellingByDate || []} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full">
            <TopRatedProducts topRatedProducts={data?.topRatedProducts || []} />
            <TopSpendingCustomers topUsersBySpending={data?.topUsersBySpending || []} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <ProductCategories productByCategory={data?.productByCategory || []} />
            <TopSellingProducts topSellingProducts={data?.topSellingProducts || []} />
            <RatingDistribution ratingStatistics={data?.ratingStatistics || []} />
          </div>
        </div>
      </div>
    </TailwindComponent>
  );
};

export default Dashboard;

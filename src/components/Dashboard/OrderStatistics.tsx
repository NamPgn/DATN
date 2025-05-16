import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderStatisticsProps {
  orderStatistics: {
    total_orders: number;
    pending_orders: string;
    confirmed_orders: string;
    completed_orders: string;
    canceled_orders: string;
  };
}

const OrderStatistics = ({ orderStatistics }: OrderStatisticsProps) => {
  const data = {
    labels: ['Đang xử lý', 'Đã xác nhận', 'Hoàn thành', 'Đã hủy'],
    datasets: [
      {
        data: [
          parseInt(orderStatistics.pending_orders),
          parseInt(orderStatistics.confirmed_orders),
          parseInt(orderStatistics.completed_orders),
          parseInt(orderStatistics.canceled_orders),
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Thống kê đơn hàng',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Tổng số đơn hàng: {orderStatistics.total_orders}</h3>
      </div>
      <div className="h-[300px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default OrderStatistics; 
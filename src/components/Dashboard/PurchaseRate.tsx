import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PurchaseRateProps {
  loginPurchaseRate: number;
  guestPurchaseRate: number;
}

const PurchaseRate = ({ loginPurchaseRate, guestPurchaseRate }: PurchaseRateProps) => {
  const data = {
    labels: ['Khách hàng đã đăng nhập', 'Khách hàng chưa đăng nhập'],
    datasets: [
      {
        data: [loginPurchaseRate, guestPurchaseRate],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
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
        text: 'Tỷ lệ mua hàng',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Phân tích khách hàng</h3>
      </div>
      <div className="h-[300px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Khách hàng đã đăng nhập</p>
          <p className="text-lg font-semibold text-gray-800">{loginPurchaseRate.toFixed(2)}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Khách hàng chưa đăng nhập</p>
          <p className="text-lg font-semibold text-gray-800">{guestPurchaseRate.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRate; 
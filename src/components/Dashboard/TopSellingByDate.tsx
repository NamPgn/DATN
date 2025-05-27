import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Product {
  id: number;
  name: string;
  main_image: number;
}

interface TopSellingProduct {
  product_id: number;
  total_sold: string;
  product: Product;
}

interface TopSellingByDateProps {
  topSellingByDate: TopSellingProduct[];
}

const TopSellingByDate = ({ topSellingByDate }: TopSellingByDateProps) => {
  const data = {
    labels: topSellingByDate.map(item => {
      const name = item.product.name;
      return name.length > 30 ? name.substring(0, 30) + '...' : name;
    }),
    datasets: [
      {
        label: 'Số lượng đã bán',
        data: topSellingByDate.map(item => parseInt(item.total_sold)),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top sản phẩm bán chạy theo ngày',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng đã bán',
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Top sản phẩm bán chạy theo ngày</h3>
      </div>
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-4">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng đã bán</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topSellingByDate.map((item) => (
              <tr key={item.product_id}>
                <td className="px-4 py-2 text-sm text-gray-900">{item.product.name}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.total_sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingByDate; 
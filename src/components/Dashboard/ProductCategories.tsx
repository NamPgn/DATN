import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface ProductCategoriesProps {
  productByCategory: Array<{
    id: number;
    name: string;
    total_products: number;
  }>;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ productByCategory }) => {
  const chartData = {
    labels: productByCategory?.map((c) => c.name),
    datasets: [
      {
        label: "Total Products",
        data: productByCategory?.map((c) => c.total_products),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Phân bố sản phẩm theo danh mục
      </h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default ProductCategories; 
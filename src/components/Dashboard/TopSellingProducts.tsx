import React from 'react';
import { Table } from 'antd';

interface TopSellingProductsProps {
  topSellingProducts: Array<{
    product_id: number;
    total_sold: string;
    product: {
      id: number;
      name: string;
      main_image: number;
    };
  }>;
}

const TopSellingProducts: React.FC<TopSellingProductsProps> = ({ topSellingProducts }) => {
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng bán",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a: any, b: any) => Number(a.quantity) - Number(b.quantity),
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
      render: (text: number) => `${text.toLocaleString()} đ`,
    },
  ];

  const dataSource = topSellingProducts?.map((item, index) => ({
    key: index,
    name: item.product.name,
    quantity: item.total_sold,
    revenue: Number(item.total_sold) * 100000, // Giả định giá trị doanh thu
  }));

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Top 5 Sản phẩm bán chạy
      </h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default TopSellingProducts; 
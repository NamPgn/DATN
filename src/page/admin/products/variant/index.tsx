import { useState } from "react";
import { Table, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import { columnsProductVariant } from "../../../../constant";
import { useQuery } from "react-query";
import { variantsProduct } from "../../../../sevices/products";

const ProductVariant = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data: productsVariants, refetch }: any = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await variantsProduct(id);
      return response.data;
    },
  });
  const data = productsVariants?.variants?.map((items: any) => {
    const [color, size] = items.values;
    return {
      ...items,
      size: size,
      color: color,
      pr_name: productsVariants?.name,
    };
  });
  return (
    <div>
      <Link to={"/dashboard/add/product/variant/"+id}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Thêm biến thể mới
        </Button>
      </Link>
      <Link to={"/dashboard/add/product/variant/management/" + id}>
        <Button style={{ marginLeft: 8, marginBottom: 16 }}>
          Quản lí thuộc tính
        </Button>
      </Link>
      <Table columns={columnsProductVariant} dataSource={data} />
    </div>
  );
};

export default ProductVariant;

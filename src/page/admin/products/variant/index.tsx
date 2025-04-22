import { Table, Button, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { columnsProductVariant } from "../../../../constant";
import { useMutation, useQuery } from "react-query";
import {
  deleteVariantsProduct,
  variantsProduct,
} from "../../../../sevices/products";
import { MyButton } from "../../../../components/UI/Core/Button";
import MVConfirm from "../../../../components/UI/Core/Confirm";
import AttributeForm from "../component/variantManage";

const ProductVariant = () => {
  const { id }: any = useParams();
  const { data: productsVariants, refetch }: any = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await variantsProduct(id);
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await deleteVariantsProduct(data);
    },
    onSuccess: () => {
      message.success("Xóa thể thành công!");
      refetch();
    },
    onError: ({ response }: any) => {
      message.error(response?.data?.message);
    },
  });

  const data = productsVariants?.variants?.map((items: any) => {
    return {
      ...items,
      // image: <Image width={50} src={items?.url} />,
      values: items.values,
      pr_name: productsVariants?.name,
      action: (
        <div className="d-flex gap-1">
          <Link
            to={`/dashboard/product/${productsVariants?.id}/variants/${items.id}/edit`}
          >
            <MyButton type={"primary"} className="ml-2">
              Sửa
            </MyButton>
          </Link>
          <MVConfirm
            title="Có xóa không"
            onConfirm={() => mutate(items?.id)}
          >
            <MyButton danger className="ml-2">
              Xóa
            </MyButton>
          </MVConfirm>
        </div>
      ),
    };
  });
  return (
    <div>
      <div className="d-flex gap-2">
        <Link to={"/dashboard/add/product/variant/" + id}>
          <Button type="primary" style={{ marginBottom: 16 }}>
            Thêm biến thể mới
          </Button>
        </Link>
        <AttributeForm idProduct={id} />
      </div>
      <Table columns={columnsProductVariant} dataSource={data} />
    </div>
  );
};

export default ProductVariant;

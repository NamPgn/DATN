import {
  Modal,
  Button,
  Spin,
  Avatar,
  Table,
  Pagination,
  InputNumber,
} from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { getProductsOrder } from "../../../../sevices/products";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phân loại",
    dataIndex: "variants",
    key: "variants",
  },
];

const ProductSelectModal = ({
  setSelectedProducts,
  selectedProducts,
  MutateShipping,
  selectedValues,
}: any) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(["products", page], () =>
    getProductsOrder(page)
  );
  const handleSelect = (variant: any, product: any) => {
    if (selectedProducts.some((v: any) => v.id === variant.id)) return;
    const variationObject = variant?.values.reduce(
      (acc: Record<string, string>, item: any) => {
        if (item.attribute_value.name.includes("Màu")) {
          acc.color = item.attribute_value.name;
        } else {
          acc.size = item.attribute_value.name;
        }
        return acc;
      },
      {}
    );
    setSelectedProducts([
      ...selectedProducts,
      {
        ...variant,
        variation_id: variant.id,
        name: product.name,
        image: product.image_url,
        price: variant.regular_price,
        quantity: variant.stock_quantity,
        variation: variationObject,
      },
    ]);
  };

  const handleRemove = (variantId: any) => {
    setSelectedProducts(
      selectedProducts.filter((v: any) => v.id !== variantId)
    );
  };

  const handleChangeQuantity = (variantId: any, value: any) => {
    setSelectedProducts((prev: any) =>
      prev.map((v: any) =>
        v.id === variantId
          ? { ...v, quantity: value, total_price: v.regular_price * value }
          : v
      )
    );

    MutateShipping({
      to_district_id: selectedValues.select2.value,
      to_ward_code: selectedValues.select3.value,
      weight: selectedProducts.reduce(
        (sum: number, item: any) => sum + item.weight * item.quantity,
        0
      ),
    });
  };
  const dataSource = data?.data?.data?.data?.map((product: any) => ({
    key: product.id,
    name: product.name,
    image: <Avatar src={product.image_url} />,
    weight: product.weight,
    variants: product.variants.map((variant: any) => {
      return (
        <div key={variant.id} className="border p-2 my-1">
          <p>
            Giá: <span className="line-through">{variant.regular_price}đ</span>{" "}
            -<b className="text-red-500"> {variant.sale_price}đ</b>
          </p>
          <p>Số lượng tồn: {variant.stock_quantity}</p>
          <p>
            Thuộc tính:{" "}
            {variant.values.map((v: any) => v.attribute_value.name).join(", ")}
          </p>
          <p>Cân nặng: {variant?.weight}</p>
          <Button
            variant="text"
            color="default"
            icon={<CheckOutlined />}
            onClick={() => handleSelect(variant, product)}
            disabled={selectedProducts.some((v: any) => v.id === variant.id)}
          >
            Chọn sản phẩm
          </Button>
        </div>
      );
    }),
    action: null,
  }));

  return (
    <>
      <Button onClick={() => setVisible(true)}>Chọn sản phẩm</Button>
      <Modal
        title="Chọn sản phẩm"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={1000}
      >
        {isLoading ? (
          <Spin size="large" className="flex justify-center" />
        ) : (
          <>
            <Table
              dataSource={dataSource}
              rowKey="id"
              pagination={false}
              columns={columns}
            />
            <Pagination
              current={page}
              onChange={setPage}
              total={50}
              className="mt-4 text-center"
            />
          </>
        )}
      </Modal>
      <div className="mt-4">
        <h3>Sản phẩm đã chọn:</h3>
        <ul className="list-unstyled">
          {selectedProducts?.map((variant: any) => (
            <li
              key={variant.id}
              className="d-flex align-items-center gap-2 mb-2"
            >
              <Avatar src={variant.image} />
              <span>
                {variant.name} -{" "}
                {variant.values
                  .map((v: any) => v.attribute_value.name)
                  .join(", ")}{" "}
                ------- {variant.total_price}VND
              </span>
              <InputNumber
                min={1}
                max={variant?.stock_quantity}
                placeholder="Số lượng"
                value={variant.quantity}
                onChange={(value) => handleChangeQuantity(variant.id, value)}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(variant.id)}
              >
                Xóa
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductSelectModal;

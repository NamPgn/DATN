/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { ButtonAdd, MyButton } from "../../../components/UI/Core/Button";
import MVConfirm from "../../../components/UI/Core/Confirm";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsProducts } from "../../../constant";
import {
  delMultipleProduct,
  delProduct,
  getProducts,
} from "../../../sevices/products";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const ProductsAdmin = () => {
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: products, refetch }: any = useQuery({
    queryKey: ["products", page],
    queryFn: async () => await getProducts(page),
  });
  const { mutate } = useMutation({
    mutationFn: async (data: string) => {
      return await delProduct(data);
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được chuyển vào thùng rác");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa:", error);
      toast.error("Xóa không thành công");
    },
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const { mutate: deleteMultiple } = useMutation({
    mutationFn: async (ids: string[]) => {
      return await delMultipleProduct(ids);
    },
    onSuccess: () => {
      toast.success("Xóa nhiều sản phẩm thành công");
      setSelectedRowKeys([]);
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa nhiều sản phẩm:", error);
      toast.error("Xóa không thành công");
    },
  });

  const handleDeleteSelectedData = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một sản phẩm để xóa");
      return;
    }
    deleteMultiple(selectedRowKeys);
  };
  const handleDelete = () => {
    const form: any = new FormData();

    form.append("ids", selectedRowKeys);
    const data: any = {
      ids: selectedRowKeys,
    };
    mutate(form);
  };
  const data =
    products &&
    products?.data?.data?.map((item: any, index: number) => {
      return {
        key: item.id,
        name: <Link to={"/q/" + item.id}>{item.name}</Link>,
        slug: item.slug,
        main_image: item.main_image,
        url: (
          <Image
            src={
              item.url
                ? item.url
                : "https://res.cloudinary.com/dkrn3fe2o/image/upload/w_250,h_250,c_thumb/v1738910579/atpfd8g1vmfprw7nxdxu.jpg"
            }
          />
        ),
        categoryName: item?.categories?.map(
          (item: any) => " " + item.name + " | "
        ),
        pivot: item.pivot,
        action: (
          <div className="d-flex gap-1">
            <Link to={`/dashboard/products/edit/${item.id}`}>
              <Button variant="filled" color="geekblue">
                Sửa
              </Button>
            </Link>
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton variant="filled" color="danger" className="ml-2">
                Xóa
              </MyButton>
            </MVConfirm>
            {item.type == "0" ? (
              <Link to={`/dashboard/product/${item.id}/variants/`}>
                <MyButton color="default" variant="dashed" type="primary">
                  QL Biến Thể
                </MyButton>
              </Link>
            ) : (
              ""
            )}
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <ButtonAdd path={`/dashboard/product/add`} />
      <div className="mb-3">
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa ?"
          onConfirm={handleDeleteSelectedData}
          okText="Yes"
          cancelText="No"
        >
          <MyButton type="primary" danger icon={<DeleteOutlined />}>
            Delete Selected
          </MyButton>
        </Popconfirm>
      </div>
      <MVTable
        columns={columnsProducts}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        size="middle"
        pagination={{
          defaultPageSize: 30,
          showSizeChanger: true,
          pageSizeOptions: ["30", "50", "70"],
          current: page,
          onChange: handlePageChangePage,
          total: products?.data?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default ProductsAdmin;

import React, { useState } from "react";
import { Image, Tag } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { MyButton } from "../../../components/UI/Core/Button";
import MVConfirm from "../../../components/UI/Core/Confirm";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsATTR, columnsProducts } from "../../../constant";
import { delProduct, getProducts } from "../../../sevices/products";

const ProductsAdmin = () => {
  const [page, setPage] = useState(1);

  const [valueId, setValue] = useState();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: products, refetch }: any = useQuery({
    queryKey: ["products", page],
    queryFn: async () => await getProducts(page),
  });
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await delProduct(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      refetch();
    },
    onError: () => {
      toast.success("Xóa không thành công");
    },
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChange = (newValue: any) => {
    setValue(newValue);
  };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const handleDeleteSelectedData = async () => {
    console.log(selectedRowKeys);
    // const response: any = await deleteMultipleProduct(selectedRowKeys);
    // if (response.data.success == true) {
    //   setInit(!init);
    //   toast.success("Delete products successfully");
    // } else {
    //   toast.error("Error deleting products");
    // }
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
              <MyButton type="primary">Edit</MyButton>
            </Link>
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton danger className="ml-2">
                Delete
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
      <Link to={`/dashboard/product/add`}>
        <MyButton type="primary" className="mb-3">
          Add
        </MyButton>
      </Link>
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

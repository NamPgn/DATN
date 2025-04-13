/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Image, Input, Popconfirm, Select } from "antd";
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
  exportFileProducts,
  getProducts,
} from "../../../sevices/products";
import { DeleteOutlined, ToTopOutlined } from "@ant-design/icons";
import TailwindComponent from "../../../components/Tailwind/TailwinComponent";
import { SearchProps } from "antd/es/input";
import { useGetProductSearch } from "../../../hook/products";
import { getCategorysAll } from "../../../sevices/category";

const { Option } = Select;

const ProductsAdmin = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: products, refetch }: any = useQuery({
    queryKey: ["products", page, keyword, categoryId],
    queryFn: async () => await getProducts(page),
  });

  const { data: searchResults } = useGetProductSearch(keyword, categoryId);

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await delProduct(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      refetch();
    },
    onError: (error) => {
      console.error("Lỗi khi xóa:", error);
      toast.error("Xóa không thành công");
    },
  });

  const { data: category }: any = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await getCategorysAll()).data,
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

  const { mutate: exportFile, isLoading } = useMutation(exportFileProducts);

  const handleDeleteSelectedData = () => {
    if (selectedRowKeys.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một sản phẩm để xóa");
      return;
    }
    deleteMultiple(selectedRowKeys);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    setKeyword(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setPage(1);
  };

  const getData = () => {
    try {
      if (searchResults?.data?.data && Array.isArray(searchResults.data.data) && searchResults.data.data.length > 0) {
        return searchResults.data.data;
      }

      if (products?.data?.data && Array.isArray(products.data.data)) {
        return products.data.data;
      }

      return [];
    } catch (error) {
      console.error("Error in getData:", error);
      return [];
    }
  };
  const data = getData().map((item: any) => {
    return {
      key: item.id,
      name: <Link to={"/q/" + item.id}>{item.name}</Link>,
      slug: item.slug,
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
    <TailwindComponent>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <ButtonAdd path={`/dashboard/product/add`} />
          <Button
            icon={<ToTopOutlined />}
            onClick={() => exportFile()}
            disabled={isLoading}
          >
            {isLoading ? "Đang tải..." : "Xuất file"}
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa ?"
            onConfirm={handleDeleteSelectedData}
            okText="Yes"
            cancelText="No"
          >
            <MyButton variant="filled" color="danger" icon={<DeleteOutlined />}>
              Delete Selected
            </MyButton>
          </Popconfirm>

          
        <div className="w-1/4">
          <Input.Search
            onSearch={onSearch}
            placeholder="Tìm kiếm sản phẩm..."
          />
        </div>

        <div className="w-1/4">
          <Select
            style={{ width: "100%" }}
            onChange={handleCategoryChange}
            placeholder="Lọc theo danh mục"
            allowClear
          >
            {Array.isArray(category) && category?.map((item: any) => {
              return <Option value={item.id}>{item.name}</Option>
            })}
          </Select>
        </div>
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
      </div>
    </TailwindComponent>
  );
};

export default ProductsAdmin;

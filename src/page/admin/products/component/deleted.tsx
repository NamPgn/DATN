import React, { useState } from "react";
import { Button, Image, Tag } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { toast } from "react-toastify";
import { DeleteOutlined, RollbackOutlined } from "@ant-design/icons";
import MVConfirm from "../../../../components/UI/Core/Confirm";
import { MyButton } from "../../../../components/UI/Core/Button";
import MVTable from "../../../../components/UI/Core/MV/Table";
import { columnsProducts } from "../../../../constant";
import { getsCategoryDeleted } from "../../../../sevices/category";
import {
  getsProductsDeleted,
  productsHardDeleted,
  productsRetoreDeleted,
} from "../../../../sevices/products";

const DeletedProducts = () => {
  const [page, setPage] = useState(1);

  const [valueId, setValue] = useState();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: productsDeleted, refetch }: any = useQuery({
    queryKey: ["productsDeleted"],
    queryFn: async () => (await getsProductsDeleted()).data,
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await productsHardDeleted(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      refetch();
    },
    onError: () => {
      toast.error("Xóa không thành công");
    },
  });

  const { mutate: mutateRetore } = useMutation({
    mutationFn: async (id: string) => {
      return await productsRetoreDeleted(id);
    },
    onSuccess: () => {
      toast.success("Khôi phục thành công");
      refetch();
    },
    onError: () => {
      toast.error("Khôi phục thành công");
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
  const handleDelete = async () => {
    const data: any = {
      ids: selectedRowKeys,
    };
    mutate(data);
    refetch();
  };

  const handleRetore = async () => {
    const data: any = {
      ids: selectedRowKeys,
    };
    mutateRetore(data);
    refetch();
  };

  const data = productsDeleted?.data?.data?.map((item: any, index: number) => {
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
      action: <div className="d-flex gap-1"></div>,
    };
  });
  return (
    <React.Fragment>
      <div className="mb-3">
        <Button
          variant="filled"
          color="blue"
          icon={<RollbackOutlined />}
          onClick={handleDelete}
        ></Button>
        <Button
          style={{ marginLeft: "10px" }}
          variant="filled"
          color="danger"
          icon={<DeleteOutlined />}
          onClick={handleRetore}
        ></Button>
      </div>
      <MVTable
        columns={columnsProducts}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 24,
          showSizeChanger: true,
          pageSizeOptions: ["24", "44", "64"],
          current: page,
          onChange: handlePageChangePage,
          total: productsDeleted?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default DeletedProducts;

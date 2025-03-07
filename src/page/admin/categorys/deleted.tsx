import React, { useState } from "react";
import { Image, Tag } from "antd";
import { Link } from "react-router-dom";
import { MyButton } from "../../../components/UI/Core/Button";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsCategory } from "../../../constant";
import { useMutation, useQuery } from "react-query";
import {
  delCategorys,
  deleteHardCategorys,
  getsCategoryDeleted,
  retoreCategoryDeleted,
} from "../../../sevices/category";
import MVConfirm from "../../../components/UI/Core/Confirm";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

const CategoryDeleted = () => {
  const [page, setPage] = useState(1);

  const [valueId, setValue] = useState();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: categoryDeleted, refetch }: any = useQuery({
    queryKey: ["categoryDeleted"],
    queryFn: async () => (await getsCategoryDeleted()).data,
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteHardCategorys(id);
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
      return await retoreCategoryDeleted(id);
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
  const handleDelete = async (id: string) => {
    const res = await delCategorys(id);
    if (res.status == 200) {
      toast.success("Xóa thành công");
    } else {
      toast.error("Xóa không thành công:" + res.data.message);
    }
    refetch();
  };

  const data = categoryDeleted?.data?.map((item: any, index: number) => {
    return {
      key: item.id,
      child: item.children,
      stt: item.id,
      name: <Link to={"/q/" + item.id}>{item.name}</Link>,
      plainName: item.name,
      slug: item.slug,
      image: (
        <Image
          width={150}
          height={200}
          style={{ objectFit: "cover" }}
          src={item.linkImg}
        />
      ),
      createAt: item.createdAt,
      duration: item.time,
      isActive:
        item.isActive == 0 ? (
          <Tag color="warning">isPending</Tag>
        ) : (
          <Tag color="success">Done</Tag>
        ),
      year: item.year,
      set: item.up,
      action: (
        <div className=" gap-1 ">
          <MVConfirm
            title="Có khôi phục không"
            onConfirm={() => mutateRetore(item.id)}
          >
            <MyButton  style={{ 
              marginRight:"10px"
             }}>
              Retore
            </MyButton>
          </MVConfirm>
          <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
            <MyButton danger className="ml-3">
              Delete
            </MyButton>
          </MVConfirm>
        </div>
      ),
    };
  });
  return (
    <React.Fragment>
      <MVTable
        columns={columnsCategory}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 24,
          showSizeChanger: true,
          pageSizeOptions: ["24", "44", "64"],
          current: page,
          onChange: handlePageChangePage,
          total: categoryDeleted?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default CategoryDeleted;

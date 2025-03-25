import React, { useState } from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { ButtonAdd, MyButton } from "../../../../components/UI/Core/Button";
import MVTable from "../../../../components/UI/Core/MV/Table";
import { columnsATTR, columnsCategory } from "../../../../constant";
import { useMutation, useQuery } from "react-query";
import { delCategorys } from "../../../../sevices/category";
import MVConfirm from "../../../../components/UI/Core/Confirm";
import { toast } from "react-toastify";
import { delAttributes, getAttributes } from "../../../../sevices/attribute";

const Attribute = () => {
  const [page, setPage] = useState(1);

  const [valueId, setValue] = useState();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: attribute, refetch }: any = useQuery({
    queryKey: ["attribute", page],
    queryFn: async () => await getAttributes(page),
  });
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await delAttributes(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      refetch();
    },
    onError: () => {
      toast.error("Xóa không thành công");
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
    attribute &&
    attribute?.data?.data?.map((item: any, index: number) => {
      return {
        key: item.id,
        child: item.children,
        stt: item.id,
        name: <Link to={"/q/" + item.id}>{item.name}</Link>,
        action: (
          <div className="d-flex gap-1">
            <Link to={`/dashboard/attribute/edit/${item.id}`}>
              <MyButton type="primary">Sửa</MyButton>
            </Link>
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton danger className="ml-2">
                Xóa
              </MyButton>
            </MVConfirm>
            <Link to={`/dashboard/attributeValue/${item.id}`}>
              <MyButton>Giá trị thuộc tính</MyButton>
            </Link>
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <ButtonAdd path={`/dashboard/attribute/add`} />
      <MVTable
        columns={columnsATTR}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 30,
          showSizeChanger: true,
          pageSizeOptions: ["30", "50", "70"],
          current: page,
          onChange: handlePageChangePage,
          total: attribute?.data?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default Attribute;

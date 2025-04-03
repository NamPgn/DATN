import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyButton } from "../../../../components/UI/Core/Button";
import MVTable from "../../../../components/UI/Core/MV/Table";
import { columnsATTR } from "../../../../constant";
import { useMutation, useQuery } from "react-query";
import MVConfirm from "../../../../components/UI/Core/Confirm";
import { toast } from "react-toastify";
import {
  delAttributesVal,
  getAttributesVals,
} from "../../../../sevices/attributeValue";

const AttributeValue = () => {
  const [page, setPage] = useState(1);
  const { id }:any = useParams();
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: attributeVal, refetch }: any = useQuery({
    queryKey: ["attributeVal", id],
    queryFn: async () => await getAttributesVals(id),
  });
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await delAttributesVal(id);
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
  // const onChange = (newValue: any) => {
  //   setValue(newValue);
  // };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  // const handleDeleteSelectedData = async () => {
  //   console.log(selectedRowKeys);
  //   // const response: any = await deleteMultipleProduct(selectedRowKeys);
  //   // if (response.data.success == true) {
  //   //   setInit(!init);
  //   //   toast.success("Delete products successfully");
  //   // } else {
  //   //   toast.error("Error deleting products");
  //   // }
  // };

  const data =
    attributeVal &&
    attributeVal?.data?.values?.map((item: any, _index: number) => {
      return {
        key: item.id,
        child: item.children,
        stt: item.id,
        name: <Link to={"/q/" + item.id}>{item.name}</Link>,
        action: (
          <div className="d-flex gap-1">
            <Link to={`/dashboard/attributeVal/edit/${item.id}`}>
              <MyButton type="primary">Sửa</MyButton>
            </Link>
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton danger className="ml-2">
                Xóa
              </MyButton>
            </MVConfirm>
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <Link to={`/dashboard/attributeVal/add`}>
        <MyButton type="primary" className="mb-3">
          Thêm
        </MyButton>
      </Link>
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
          total: attributeVal?.data?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default AttributeValue;

import React, { useState } from "react";
import { Image, Tag } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { delImageList, getImageLists } from "../../../../sevices/imageList";
import MVConfirm from "../../../../components/UI/Core/Confirm";
import { MyButton } from "../../../../components/UI/Core/Button";
import MVTable from "../../../../components/UI/Core/MV/Table";
import { columnsImageList } from "../../../../constant";

const ImageList = () => {
  const [page, setPage] = useState(1);

  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { data: imageList, refetch }: any = useQuery({
    queryKey: ["imageList", page],
    queryFn: async () => (await getImageLists(page)).data,
  });
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await delImageList(id);
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

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const data =
    imageList &&
    imageList?.map((item: any, index: number) => {
      return {
        key: item.id,
        child: item.children,
        stt: item.id,
        image: <Image src={item.url} />,
        action: (
          <div className="d-flex gap-1">
            <MVConfirm title="Có xóa không" onConfirm={() => mutate(item.id)}>
              <MyButton danger className="ml-2">
                Delete
              </MyButton>
            </MVConfirm>
          </div>
        ),
      };
    });
  return (
    <React.Fragment>
      <Link to={`/dashboard/image/add`}>
        <MyButton type="primary" className="mb-3">
          Add
        </MyButton>
      </Link>
      <MVTable
        columns={columnsImageList}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 30,
          showSizeChanger: true,
          pageSizeOptions: ["30", "50", "70"],
          current: page,
          onChange: handlePageChangePage,
          total: imageList?.data?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default ImageList;

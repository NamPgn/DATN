/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MVTable from "../../../components/UI/Core/MV/Table";
import { columnsVouchers } from "../../../constant";
import { getVouchers } from "../../../sevices/voucher";
import { useQuery } from "react-query";
import { MyButton } from "../../../components/UI/Core/Button";
import { Link } from "react-router-dom";

const VoucherAdmin = () => {
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const { data: vouchers }: any = useQuery({
    queryKey: ["vouchers", page],
    queryFn: async () => {
      return await getVouchers(page);
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
    vouchers &&
    vouchers?.data?.data?.map((item: any) => {
      return {
        key: item.id,
        stt: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        discount_percent: item.discount_percent,
        max_discount_amount: item.max_discount_amount,
        min_product_price: item.min_product_price,
        amount: item.amount,
        start_date: item.start_date,
        times_used: item.times_used,
        expiry_date: item.expiry_date,
        usage_limit: item.usage_limit,
        action: (
          <div className="d-flex gap-1">
            <Link
              to={`/dashboard/vouchers/${item.code}`}
              className="text-blue-500"
            >
              <MyButton type="dashed">Detail</MyButton>
            </Link>
          </div>
        ),
      };
    });

  return (
    <React.Fragment>
      <MVTable
        columns={columnsVouchers}
        rowSelection={rowSelection}
        dataSource={data}
        scroll={{ x: 1000, y: 1000 }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          current: page,
          onChange: handlePageChangePage,
          total: vouchers?.data?.total,
        }}
      ></MVTable>
    </React.Fragment>
  );
};

export default VoucherAdmin;

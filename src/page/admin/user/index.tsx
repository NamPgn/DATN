import { Dropdown, Menu, Avatar, Space, Tag, Button, Divider } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  MoreOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import MVTable from "../../../components/UI/Core/MV/Table";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteUser, getUser, getUsers } from "../../../sevices/users";
import { COLUMN_TABLE_USERS } from "../../../constant";
import { toast } from "react-toastify";
import MVConfirm from "../../../components/UI/Core/Confirm";
import { Link } from "react-router-dom";

const EmloyeeTable = () => {
  const [page, setPage]: any = useState(1);
  const [selectedRowKeys, setSelectedRowKeys]: any = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteUser(id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      refetch();
    },
    onError: () => {
      toast.error("Xóa không thành công");
    },
  });
  const { data: user, refetch }: any = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      return (await getUsers(page))?.data?.data?.map((item: any) => {
        return {
          key: item.id,
          name: item.name,
          username: item.username,
          email: item.email,
          role: item.role,
          customer: (
            <>
              <Space>
                <Avatar src={item?.avatar} size="small">
                  {item?.avatar ? null : item?.name.charAt(0)}
                </Avatar>
                <div>
                  <div>{item?.name}</div>
                  <div style={{ color: "gray", fontSize: "12px" }}>
                    {item?.email}
                  </div>
                </div>
              </Space>
            </>
          ),
          is_active:
            item.is_active == true ? (
              <Tag color="green">active</Tag>
            ) : (
              <Tag color="gray">passive</Tag>
            ),
          action: (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="lock" icon={<LockOutlined />}>
                    Block
                  </Menu.Item>
                  <Menu.Item key="unlock" icon={<UnlockOutlined />}>
                    Unlock
                  </Menu.Item>
                  <Menu.Item key="edit" icon={<EditOutlined />}>
                    <Link to={"/dashboard/users/edit/" + item.id}>Edit</Link>
                  </Menu.Item>
                  <Divider />
                  <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                    <MVConfirm
                      title="Có xóa không"
                      onConfirm={() => mutate(item.id)}
                    >
                      Delete
                    </MVConfirm>
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <Button
                variant="dashed"
                type="text"
                style={{
                  transform: "rotate(90deg)",
                }}
                icon={<MoreOutlined />}
              />
            </Dropdown>
          ),
        };
      });
    },
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleChangePage = (val: any) => {
    setPage(val);
  };

  return (
    <>
      <Link to={"/dashboard/users/add"}>
        <Button
          color="default"
          className="mb-3"
          variant="dashed"
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </Link>
      <MVTable
        columns={COLUMN_TABLE_USERS}
        rowSelection={rowSelection}
        dataSource={user}
        scroll={{ x: 1000, y: 1000 }}
        size="middle"
        pagination={{
          defaultPageSize: 30,
          showSizeChanger: true,
          pageSizeOptions: ["30", "50", "70"],
          current: page,
          onChange: handleChangePage,
          total: 30,
        }}
      ></MVTable>
    </>
  );
};

export default EmloyeeTable;

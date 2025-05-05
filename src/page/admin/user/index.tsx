/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dropdown,
  Menu,
  Avatar,
  Space,
  Tag,
  Button,
  Divider,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  MoreOutlined,
  SendOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import MVTable from "../../../components/UI/Core/MV/Table";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  blockUser,
  deleteUser,
  getUsers,
  sendEmailForgotPass,
  unLockUser,
} from "../../../sevices/users";
import { COLUMN_TABLE_USERS } from "../../../constant";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import BlockAccountModal from "./components/modalConfirmBlockUser";
import { ButtonAdd } from "../../../components/UI/Core/Button";
import { token_auth } from "../../../common/auth/getToken";
import { UsersContext } from "../../../context/usersContext";

const EmloyeeTable = () => {
  const { userId } = useContext(UsersContext);
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpenBlock, setIsModalOpenBlock] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );
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

  const { mutate: MUTATEUSERBLOCK } = useMutation({
    mutationFn: async (data: string) => {
      return await blockUser(data);
    },
    onSuccess: () => {
      toast.success("Khóa tài khoản thành công");
      refetch();
      setIsModalOpenBlock(false);
    },
    onError: () => {
      toast.error("Khóa tài khoản không thành công");
    },
  });

  const { mutate: MUTATEUNLOCKUSER } = useMutation({
    mutationFn: async (data: string) => {
      return await unLockUser(data);
    },
    onSuccess: () => {
      toast.success("Mở khóa tài khoản thành công");
      refetch();
      setIsModalOpenBlock(false);
    },
    onError: () => {
      toast.error("Mở khóa tài khoản không thành công");
    },
  });

  const { mutate: MUTATESENDEMAILCHANGEPASS } = useMutation({
    mutationFn: async (data: string) => {
      return await sendEmailForgotPass(data);
    },
    onSuccess: () => {
      toast.success("Gửi email thay đổi mật khẩu tài khoản thành công");
      refetch();
      setIsModalOpenBlock(false);
    },
    onError: () => {
      toast.error("Gửi email thay đổi mật khẩu tài khoản không thành công");
    },
  });

  // const handleOpenModalBlock = () => {
  //   setIsModalOpenBlock(true);
  // };

  const handleCloseModalBlock = () => {
    setIsModalOpenBlock(false);
  };

  const handleSubmit = (selectedReasons: any) => {
    const data: any = {
      id: selectedUserId,
      reson: selectedReasons[0],
    };
    MUTATEUSERBLOCK(data);
  };

  const handleUnlockUser = () => {
    const data: any = {
      id: selectedUserId,
    };
    MUTATEUNLOCKUSER(data);
  };

  const handleSendMailResetPassword = () => {
    const data: any = {
      email: selectedUserEmail,
    };
    MUTATESENDEMAILCHANGEPASS(data);
  };

  const { data: user, refetch } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      return (await getUsers(page))?.data?.data?.map((item: any) => {
        return {
          key: item.id,
          name: item.name,
          username: item.username,
          email: item.email,
          role:
            item.role == "admin" ? (
              <Tag color="gold">{item.role}</Tag>
            ) : (
              <Tag color="geekblue">{item.role}</Tag>
            ),
          customer: (
            <Space>
              <Avatar src={item?.urlImg} size="small">
                {item?.avatar ? null : item?.name.charAt(0)}
              </Avatar>
              <div>
                <div>{item?.name}</div>
                <div style={{ color: "gray", fontSize: "12px" }}>
                  {item?.email}
                </div>
              </div>
            </Space>
          ),
          is_active: item.is_active ? (
            <Tag color="green">Hoạt động</Tag>
          ) : (
            <Tag color="red">Đã khóa</Tag>
          ),
          action: (
            <Dropdown
              overlay={
                <>
                  {(item.role === "member" || (item.role === "staff" && userId?.role === "admin")) ? (
                    <Menu>
                      <>
                        {item.is_active ? (
                          <Menu.Item
                            key="lock"
                            icon={<LockOutlined />}
                            onClick={(_e: any) => {
                              setSelectedUserId(item.id);
                              setIsModalOpenBlock(true);
                            }}
                          >
                            <div>Khóa</div>
                          </Menu.Item>
                        ) : (
                          <Menu.Item
                            key="unlock"
                            onClick={() => {
                              setSelectedUserId(item.id);
                              handleUnlockUser();
                            }}
                            icon={<UnlockOutlined />}
                          >
                            Bỏ khóa
                          </Menu.Item>
                        )}
                      </>

                      <Divider />

                      <Menu.Item
                        key="resetpass"
                        onClick={(_e: any) => {
                          setSelectedUserEmail(item.email);
                          handleSendMailResetPassword();
                        }}
                        icon={<SendOutlined />}
                      >
                        Đặt lại mật khẩu
                      </Menu.Item>
                      <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUserId(item.id);
                            setIsModalOpen(true);
                          }}
                        >
                          Xóa
                        </div>
                      </Menu.Item>
                    </Menu>
                  ) : (
                    ""
                  )}
                </>
              }
              trigger={["click"]}
            >
              {(item.role === "member" || (item.role === "staff" && userId?.role === "admin")) ? (
                <Button
                  variant="dashed"
                  type="text"
                  style={{ transform: "rotate(90deg)" }}
                  icon={<MoreOutlined />}
                />
              ) : (
                ""
              )}
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

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      mutate(selectedUserId);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <BlockAccountModal
        visible={isModalOpenBlock}
        onCancel={handleCloseModalBlock}
        onSubmit={handleSubmit}
      />
      <ButtonAdd path={`/dashboard/users/add`} />
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
      />

      <Modal
        title="Xác nhận xóa"
        open={isModalOpen}
        onOk={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
      </Modal>
    </>
  );
};

export default EmloyeeTable;

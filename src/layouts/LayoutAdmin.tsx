/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Badge, Button, Drawer, Input, Layout, Menu, Spin } from "antd";
import {
  BellOutlined,
  CheckOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import MVCol from "../components/UI/Core/MV/Grid/Col";
import { Header } from "antd/es/layout/layout";
import AuthHeader from "../components/UI/Header/auth";
import PageTitle from "../components/UI/Core/PageTitle";
import { TableRouterAdminPage } from "../router";
import { useMutation, useQuery } from "react-query";
import { changeNotify, getNotify } from "../sevices/client/notifycation";
import { UsersContext } from "../context/usersContext";
const { Content, Sider, Footer } = Layout;

const LayoutAdmin = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { userId } = useContext(UsersContext) as { userId: any };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { data, isLoading, refetch }: any = useQuery({
    queryKey: ["notify"],
    queryFn: async () => {
      return (await getNotify()).data?.data;
    },
  });
  const unreadCount = data?.filter(
    (notification: any) => notification.is_read !== 1
  ).length;

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      return await changeNotify({
        id,
        is_read: true,
      });
    },
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const items2: any = [
    {
      key: "group-application",
      type: "group",
      label: "Application",
      children: TableRouterAdminPage.filter((item: any) => !item.children).map(
        (items, index) => ({
          key: `app-${index}`,
          icon: items.icon,
          label: <Link to={items.path || ""}>{items.name}</Link>,
        })
      ),
    },
    {
      key: "group-apps",
      type: "group",
      label: "Apps",
      children: TableRouterAdminPage.filter((item: any) => item.children).map(
        (items: any, index) => ({
          key: `apps-${index}`,
          icon: items.icon,
          label: <Link to={items.path || ""}>{items.name}</Link>,
          children: items.children.map((subItem: any, j: any) => ({
            key: `sub-${index}-${j}`,
            icon: subItem.icon,
            label: <Link to={subItem.path}>{subItem.name}</Link>,
          })),
        })
      ),
    },
  ];

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={80}
          width={230}
          className="custom-sider overflow-y-hidden bg-white shadow-lg"
          style={{ height: "100%", position: "fixed" }}
        >
          <div className="logo_ p-3 text-center">
            <Link to="/" data-discover="true">
              <img
                src="/assets/images/logo.jpg"
                alt="Ulina"
                className="w-150 h-auto"
              />
            </Link>
          </div>
          <Menu
            style={{
              height: "calc(100% - 56px)",
              marginTop: "8px",
              color: "#999",
            }}
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items2}
          />
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 230 }}>
          <Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              padding: "0 16px 0 1px",
            }}
          >
            <div className="w-50">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <span>
                Pages / <PageTitle />
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {userId?.email?.[0]?.toUpperCase()}
                </div>
                <p className="text-gray-700 font-medium">{userId?.email}</p>
              </div>

              <div className="h-6 w-px bg-gray-300"></div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <AuthHeader />
                </div>

                <Badge
                  count={unreadCount}
                  className="cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
                >
                  <BellOutlined
                    onClick={showDrawer}
                    className="text-xl text-gray-600 hover:text-blue-500 transition-colors"
                  />
                </Badge>
              </div>
            </div>
          </Header>
          <Content
            style={{
              padding: "24px",
              minHeight: "calc(100vh - 64px)",
              overflow: "auto",
            }}
          >
            <Outlet />
          </Content>
          <Footer>© 2025 copyright</Footer>
        </Layout>
      </Layout>
      <Drawer title="Thông báo" onClose={onClose} open={open}>
        {isLoading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="space-y-4">
            {data?.map((item: any) => {
              const linkTo = item?.order_id
                ? `/dashboard/orders/${item.order_id}`
                : item?.voucher_id
                ? `/dashboard/vouchers/${item.voucher_id}`
                : "#";

              return (
                <Link
                  key={item.id}
                  to={linkTo}
                  onClick={() => markAsReadMutation.mutate(item.id)}
                >
                  <div
                    className={`relative my-2 p-3 border-b border-gray-200 rounded-md ${
                      item.is_read ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    {!item.is_read && (
                      <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}

                    <h3
                      className="font-semibold"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></h3>
                    <p
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: item.message }}
                    ></p>

                    {item.is_read === 1 && (
                      <p className="text-right text-sm text-gray-500">
                        {" "}
                        <CheckOutlined /> Đã đọc
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Drawer>
    </>
  );
};

export default LayoutAdmin;

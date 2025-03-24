import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Badge, Button, Drawer, Input, Layout, Menu } from "antd";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import MVCol from "../components/UI/Core/MV/Grid/Col";
import { Header } from "antd/es/layout/layout";
import AuthHeader from "../components/UI/Header/auth";
import PageTitle from "../components/UI/Core/PageTitle";
import { TableRouterAdminPage } from "../router";
import { useQuery } from "react-query";
import { getNotify } from "../sevices/client/notifycation";
const { Content, Sider, Footer } = Layout;

const LayoutAdmin = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
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

  const [collapsed, setCollapsed] = useState(false);

  const { data, isLoading }: any = useQuery({
    queryKey: ["notify"],
    queryFn: async () => {
      return (await getNotify()).data?.data;
    },
  });
  console.log(data);
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
                src="/assets/images/logo.png"
                alt="Ulina"
                className="w-50 h-auto"
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
            <div
              style={{ display: "flex", alignItems: "center", gap: "0 20px" }}
            >
              <Input.Search placeholder="Type here..." />
              <MVCol>
                <AuthHeader />
              </MVCol>

              <SettingOutlined style={{ fontSize: "20px" }} />

              <Badge count={4}>
                <BellOutlined
                  onClick={showDrawer}
                  style={{ fontSize: "20px" }}
                />
              </Badge>
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default LayoutAdmin;

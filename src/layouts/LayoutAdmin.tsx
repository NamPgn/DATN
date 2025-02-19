import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Breadcrumb, Input, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MyButton } from "../components/UI/Core/Button";
import MVCol from "../components/UI/Core/MV/Grid/Col";
import MVRow from "../components/UI/Core/MV/Grid";
import { Header } from "antd/es/layout/layout";
import AuthHeader from "../components/UI/Header/auth";
import PageTitle from "../components/UI/Core/PageTitle";
import { TableRouterAdminPage } from "../router";
const { Content, Sider, Footer } = Layout;

const LayoutAdmin = () => {
  const items2 = TableRouterAdminPage.map((items, index) => {
    const key = String(index + 1);
    return {
      key: `${key + 1}`,
      icon: items.icon,
      label: <Link to={items.path || ""}>{items.name}</Link>,
      children: items?.children?.map((_, j) => {
        const subKey = j + 1;
        return {
          key: `subitem-${key}-${subKey}`,
          icon: _.icon,
          label: <Link to={_.path}>{_.name}</Link>,
        };
      }),
    };
  });
  const handleSearch = (e: any) => {
    console.log(e);
  };
  // const { isLoggedInState } = useContext(MyContext) ?? {};
  const [collapsed, setCollapsed] = useState(false);
  return (
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
        className="custom-sider overflow-y-hidden bg-white shadow-lg"
        style={{ height: "100%", position: "fixed" }}
      >
        <div className="logo_ p-3 text-center">
          <Link to="/" data-discover="true">
            <img
              src="/assets/images/logo.png"
              alt="Ulina"
              className="max-w-full h-auto"
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

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{ backgroundColor: "#b1c8ca", padding: "0 20px" }}>
          <MVRow align={"middle"} justify={"space-between"}>
            <MVCol>
              <MyButton
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </MVCol>
            <MVCol>
              <Input
                placeholder="Search..."
                style={{
                  width: "300px",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  border: "1px solid #d9d9d9",
                  padding: "4px 12px",
                }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </MVCol>
            <MVCol>
              <AuthHeader />
            </MVCol>
          </MVRow>
        </Header>

        <Content
          style={{
            padding: "24px",
            minHeight: "calc(100vh - 64px)",
            overflow: "auto",
          }}
        >
          <PageTitle />
          <Outlet />
        </Content>
        <Footer>© 2025 copyright</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;

import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { TableRouterAdminPage } from "../constant";
const { Content, Sider, Footer } = Layout;

const LayoutAdmin = () => {
  const items2 = TableRouterAdminPage.map((items, index) => {
    const key = String(index + 1);
    return {
      key: `${key + 1}`,
      icon: items.icon,
      label: <Link to={items.path}>{items.name}</Link>,
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
        className="custom-sider overflow-y-auto"
        style={{ height: "100%", position: "fixed" }}
      >
        <div className="p-4 bg-[#fff]">
          <div className="h-8 w-full bg-[#ddd] rounded"></div>
        </div>
        <Menu
          style={{ height: "calc(100% - 56px)", marginTop: "8px" }}
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items2}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        {/* <Header
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            padding: 0,
          }}
        >
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
                children={undefined}
              />
            </MVCol>
            <MVCol>
              <Link to={"/"}>Home Page</Link>
            </MVCol>
            <MVCol
              style={{
                textAlign: "center",
              }}
              span={1}
            >
              <AuthHeader isLoggedInState={isLoggedInState} style={undefined} />
            </MVCol>
          </MVRow>
        </Header> */}
        <Content
          style={{
            padding: "24px",
            minHeight: "calc(100vh - 64px)",
            overflow: "auto",
          }}
        >
          {/* <Collapse>
            <Panel key={"1"} className="mb-2" header="Tiêu đề Collapse">
              {text}
            </Panel>
          </Collapse> */}
          <Outlet />
        </Content>
        <Footer>© 2023 copyright | PH ANG</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;

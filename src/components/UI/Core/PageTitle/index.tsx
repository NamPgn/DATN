import React from "react";
import { Typography, Divider } from "antd";
import { useLocation } from "react-router-dom";
import { TableRouterAdminPage } from "../../../../constant";

const { Title } = Typography;

const PageTitle: React.FC = () => {
  const location = useLocation();
  const findCurrentRoute = (routes: any[], path: string): any => {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }
      if (route.children) {
        const childRoute = route.children.find(
          (child: any) => child.path === path
        );
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return null;
  };
  const currentRoute = findCurrentRoute(TableRouterAdminPage, location.pathname);
  const title = currentRoute?.name || "Trang Quản Trị";
  return (
    <div style={{ marginBottom: "24px" }}>
      <Title level={2} style={{ marginBottom: "8px", color: "#1f2937" }}>
        {title}
      </Title>
      <Divider
        style={{
          marginTop: "16px",
        }}
      />
    </div>
  );
};

export default PageTitle;

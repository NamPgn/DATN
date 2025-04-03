import React from "react";
import { useLocation } from "react-router-dom";
import { TableRouterAdminPage } from "../../../../router";


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
  const currentRoute = findCurrentRoute(
    TableRouterAdminPage,
    location.pathname
  );
  const title = currentRoute?.name || "Trang Quản Trị";
  return title;
};

export default PageTitle;

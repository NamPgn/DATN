import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbRouterAdminPage } from "../../../../constant";

const AdminBreadcrumb = () => {
  const location = useLocation();
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {BreadcrumbRouterAdminPage.map((item: any, index: any) => {
        const isActive = location.pathname === item.href;
        console.log(isActive);
        return (
          <Breadcrumb.Item key={index}>
            {isActive == true ? (
              <Link to={item.href}>
                {item?.icon} {item.name}
              </Link>
            ) : (
              <>
                <Link to={item.href}>
                  {item?.icon} {item.name}
                </Link>
              </>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default AdminBreadcrumb;

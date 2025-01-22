import {
  ArrowUpOutlined,
  BorderLeftOutlined,
  ControlOutlined,
  DashboardOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const URLSECTION = [
  {
    PATH: "/team",
    SECTTIONTITLE: "Team Members",
  },
  {
    PATH: "/about",
    SECTTIONTITLE: "About Ulina",
  },
  {
    PATH: "/team",
    SECTTIONTITLE: "ABOUT",
  },
  {
    PATH: "/shop",
    SECTTIONTITLE: "Shop",
  },
  {
    PATH: "/cart",
    SECTTIONTITLE: "Shopping Cart",
  },
  {
    PATH: "/product/detail",
    SECTTIONTITLE: "Product Detail",
  },
  {
    PATH: "/contact",
    SECTTIONTITLE: "Contact",
  },
  {
    PATH: "/checkout",
    SECTTIONTITLE: "Checkout",
  },
];

export const TableRouterAdminPage = [
  {
    path: "/admin",
    name: "Admin",
    icon: <DashboardOutlined />,
  },
  {
    path: "/admin/products",
    name: "Products",
    icon: <NotificationOutlined />,
  },
  {
    name: "User",
    icon: <SlidersOutlined />,
    children: [
      {
        path: "/admin/users",
        name: "Users",
        icon: <UserOutlined />,
      },
      {
        path: "/admin/adminUer",
        name: "Admin",
        icon: <LaptopOutlined />,
      },
    ],
  },
  {
    name: "Category",
    icon: <SlidersOutlined />,
    children: [
      {
        path: "/admin/category",
        name: "Category",
        icon: <ControlOutlined />,
      },
    ],
  },
];

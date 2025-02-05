import {
  ArrowUpOutlined,
  BorderLeftOutlined,
  ControlOutlined,
  DashboardOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PicLeftOutlined,
  RetweetOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

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
    SECTTIONTITLE: "SHOP",
  },
  {
    PATH: "/cart",
    SECTTIONTITLE: "Shopping Cart",
  },
  {
    PATH: "/product/detail",
    SECTTIONTITLE: "Product Detail",
  },
];

export const TableRouterAdminPage = [
  {
    path: "/dashboard",
    name: "Admin",
    icon: <DashboardOutlined />,
  },
  {
    path: "/dashboard/products",
    name: "Products",
    icon: <NotificationOutlined />,
  },
  {
    name: "User",
    icon: <PicLeftOutlined />,
    children: [
      {
        path: "/dashboard/users",
        name: "Users",
        icon: <UserOutlined />,
      },
      {
        path: "/dashboard/adminUer",
        name: "Admin",
        icon: <LaptopOutlined />,
      },
    ],
  },
  {
    name: "Category",
    icon: <SlidersOutlined />,
    path: "/dashboard/category",
    children: [
      {
        path: "/dashboard/child",
        name: "Child",
        icon: <RetweetOutlined />,
      },
      {
        path: "/dashboard/category/deleted",
        icon: <ControlOutlined />,
        name: "Deleted",
      },
    ],
  },
];

export const BreadcrumbRouterAdminPage = [
  {
    title: <Link to="/dashboard">Home</Link>,
    icon: <DashboardOutlined />,
    href: "/dashboard",
    name: "Admin",
  },
  {
    title: <Link to="/dashboard/products">Products</Link>,
    icon: <NotificationOutlined />,
    href: "/dashboard/products",
    name: "Products",
  },
  {
    title: <Link to="/dashboard/products">Category</Link>,
    icon: <SlidersOutlined />,
    href: "/dashboard/category",
    name: "Category",
  },
  {
    href: "category/deleted",
    title: <Link to="category/deleted">Category</Link>,
    icon: <ControlOutlined />,
    name: "Deleted",
  },
];
export const columnsCategory = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
    width: 100,
    showSorterTooltip: { target: "full-header" },
    sorter: (a: any, b: any) => a.key - b.key,
    sortDirections: ["descend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 100,
    onFilter: (value: any, record: any) =>
      record.plainName.toLowerCase().includes(value.toLowerCase()),

    filters: [
      {
        text: "Quần",
        value: "quần",
      },
      {
        text: "Áo",
        value: "áo",
      },
    ],
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
    width: 120,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
];

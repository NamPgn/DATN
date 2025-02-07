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

export const columnsATTR = [
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
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
];

export const columnsComments = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
    width: 40,
    showSorterTooltip: { target: "full-header" },
    sorter: (a: any, b: any) => a.key - b.key,
    sortDirections: ["descend"],
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
    width: 100,
  },
  {
    title: "User id",
    dataIndex: "user_id",
    key: "user_id",
    width: 100,
  },
  {
    title: "Product id",
    dataIndex: "product_id",
    key: "product_id",
    width: 100,
  },
  {
    title: "Active",
    dataIndex: "is_active",
    key: "is_active",
    width: 100,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    width: 100,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
];

export const columnsImageList = [
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
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 100,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
];

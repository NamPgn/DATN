import {
  ControlOutlined,
  DashboardOutlined,
  NotificationOutlined,
  SlidersOutlined,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorter: (a: any, b: any) => a.key - b.key,
    sortDirections: ["descend"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 100,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const columnsATTR = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
    width: 100,
    showSorterTooltip: { target: "full-header" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const columnsVouchers = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
    width: 40,
    showSorterTooltip: { target: "full-header" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorter: (a: any, b: any) => a.key - b.key,
    sortDirections: ["descend"],
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 100,
  },
  {
    title: "Discount Percent",
    dataIndex: "discount_percent",
    key: "discount_percent",
    width: 100,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 100,
  },
  {
    title: "Min Price",
    dataIndex: "min_product_price",
    key: "min_product_price",
    width: 100,
  },
  {
    title: "Max Discount",
    dataIndex: "max_discount_amount",
    key: "max_discount_amount",
    width: 100,
  },
  {
    title: "Usage Limit",
    dataIndex: "usage_limit",
    key: "usage_limit",
    width: 100,
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    key: "start_date",
    width: 100,
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry_date",
    key: "expiry_date",
    width: 100,
  },
  {
    title: "Times Used",
    dataIndex: "times_used",
    key: "times_used",
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

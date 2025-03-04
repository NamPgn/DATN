/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const columnsProducts = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 300,
  },
  {
    title: "Main Image",
    dataIndex: "main_image",
    key: "main_image",
    width: 100,
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
    width: 300,
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
    width: 250,
  },
  {
    title: "Categories Name",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 350,
  },
];

export const columnsProductVariant = [
  // {
  //   title: "Ảnh",
  //   dataIndex: "image",
  //   key: "image",
  //   render: (text:any) => <Image width={50} src={text} />,
  // },
  {
    title: "Tên Sản Phẩm",
    dataIndex: "pr_name",
    key: "pr_name",
  },
  {
    title: "Value",
    dataIndex: "values",
    key: "values",
    render: (text: any) => text.join(" - "),
  },
  {
    title: "Giá",
    dataIndex: "regular_price",
    key: "regular_price",
  },
  {
    title: "Giá sale",
    dataIndex: "sale_price",
    key: "sale_price",
  },
  {
    title: "Sku",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Số lượng",
    dataIndex: "stock_quantity",
    key: "stock_quantity",
  },
  {
    title: "Sửa",
    key: "action",
    dataIndex: "action",
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
    width: 150,
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
    title: "Type",
    dataIndex: "type",
    key: "type",
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
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 150,
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

export const columnsOrders = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 300,
  },
  {
    title: "Name",
    dataIndex: "o_name",
    key: "o_name",
    width: 150,
  },
  {
    title: "Phone",
    dataIndex: "o_phone",
    key: "o_phone",
    width: 200,
  },
  {
    title: "Final Amount",
    dataIndex: "final_amount",
    key: "final_amount",
    width: 250,
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    key: "payment_method",
  },
  {
    title: "Payment Status",
    dataIndex: "stt_payment",
    key: "stt_payment",
  },
  {
    title: " Status Track",
    dataIndex: "stt_track",
    key: "stt_track",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 250,
  },
];

export const STATUSOPTIONS = [
  { id: "1", name: "Chờ xử lý", next: ["2", "7"] },
  { id: "2", name: "Đã xử lý", next: ["3", "7"] },
  { id: "3", name: "Đang giao hàng", next: ["5", "6", "7"] },
  { id: "4", name: "Đã hoàn thành", next: [] },
  { id: "5", name: "Giao hàng thất bại", next: ["3", "7"] },
  { id: "6", name: "Đã giao hàng", next: ["4"] },
  { id: "7", name: "Hủy", next: [] },
];

export const COLUMN_TABLE_USERS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Active",
    dataIndex: "is_active",
    key: "is_active",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    width: 100,
  },
];

export interface Product {
  id: string;
  name: string;
  description?: string;
  short_description?: string;
  weight?: number;
  library?: { url: string };
  variants: {
    sale_price?: number;
    regular_price?: number;
    stock_quantity?: number;
  }[];
}

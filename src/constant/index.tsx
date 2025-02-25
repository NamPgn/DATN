import {
  ControlOutlined,
  DashboardOutlined,
  NotificationOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { render } from "react-dom";
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
    dataIndex:'values',
    key:'values',
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

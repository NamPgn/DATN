/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ControlOutlined,
  DashboardOutlined,
  NotificationOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const socialLinks = [
  { platform: "facebook", icon: "fa-facebook-f", color: "#3b5998" },
  { platform: "twitter", icon: "fa-twitter", color: "#00acee" },
  { platform: "linkedin", icon: "fa-linkedin-in", color: "#0077b5" },
  { platform: "instagram", icon: "fa-instagram", color: "#e4405f" },
];

export const URLSECTION = [
  {
    PATH: "/about",
    SECTTIONTITLE: "Giới Thiệu",
  },
  {
    PATH: "/team",
    SECTTIONTITLE: "Đội Ngũ",
  },
  {
    PATH: "/shop",
    SECTTIONTITLE: "Cửa Hàng",
  },
  {
    PATH: "/products",
    SECTTIONTITLE: "Sản Phẩm",
  },
  {
    PATH: "/cart",
    SECTTIONTITLE: "Giỏ Hàng",
  },
  {
    PATH: "/product/detail",
    SECTTIONTITLE: "Chi Tiết Sản Phẩm",
  },
  {
    PATH: "/contact",
    SECTTIONTITLE: "Liên Hệ",
  },
  {
    PATH: "/checkout",
    SECTTIONTITLE: "Thanh Toán",
  },
  {
    PATH: "/profile",
    SECTTIONTITLE: "Thông Tin",
  },
  {
    PATH: "/orders",
    SECTTIONTITLE: "Đơn hàng",
  },
];

export const BreadcrumbRouterAdminPage = [
  {
    title: <Link to="/dashboard">Trang chủ</Link>,
    icon: <DashboardOutlined />,
    href: "/dashboard",
    name: "Admin",
  },
  {
    title: <Link to="/dashboard/products">Sản phẩm</Link>,
    icon: <NotificationOutlined />,
    href: "/dashboard/products",
    name: "Products",
  },
  {
    title: <Link to="/dashboard/category">Danh mục</Link>,
    icon: <SlidersOutlined />,
    href: "/dashboard/category",
    name: "Category",
  },
  {
    href: "category/deleted",
    title: <Link to="category/deleted">Đã xoá</Link>,
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
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    width: 300,
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
    width: 300,
  },
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
    width: 250,
  },
  {
    title: "Danh mục",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Hành động",
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
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 100,
    showSorterTooltip: { target: "full-header" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorter: (a: any, b: any) => a.key - b.key,
    sortDirections: ["descend"],
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
];

export const columnsComments = [
  {
    title: "ID",
    dataIndex: "stt", 
    key: "stt",
    width: 80,
  },
  {
    title: "Tên người đánh giá",
    dataIndex: "reviewer_name",
    key: "reviewer_name", 
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "reviewer_email",
    key: "reviewer_email",
    width: 200,
  },
  {
    title: "Đánh giá",
    dataIndex: "rating",
    key: "rating",
    width: 120,
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
    width: 300,
  },
  {
    title: "Trạng thái",
    dataIndex: "is_active",
    key: "is_active",
    width: 100,
  },
  {
    title: "Trạng thái phản hồi",
    dataIndex: "has_reply",
    key: "has_reply",
    width: 120,
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    width: 150,
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    width: 250,
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
    title: "Mã Voucher",
    dataIndex: "code",
    key: "code",
    width: 100,
  },
  {
    title: "Tên Voucher",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: 100,
  },
  {
    title: "Loại Giảm Giá",
    dataIndex: "type",
    key: "type",
    width: 100,
    render: (type: number) =>
      type === 0 ? "Giảm theo số tiền" : "Giảm theo phần trăm",
  },
  {
    title: "Loại Voucher",
    dataIndex: "for_logged_in_users",
    key: "for_logged_in_users",
    width: 150,
    render: (userType: number | string) =>
      Number(userType) === 1
        ? "Chỉ dành cho người dùng đã đăng nhập"
        : "Mọi người đều có thể sử dụng",
  },
  {
    title: "Số Lượng",
    dataIndex: "usage_limit",
    key: "usage_limit",
    width: 100,
  },
  {
    title: "Ngày Tạo",
    dataIndex: "start_date",
    key: "start_date",
    width: 100,
  },
  {
    title: "Ngày Hết Hạn",
    dataIndex: "expiry_date",
    key: "expiry_date",
    width: 100,
  },
  {
    title: "Hoạt Động",
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
    title: "Ảnh",
    dataIndex: "image",
    key: "image",
    width: 100,
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    width: 100,
  },
];

export const columnsOrders = [
  {
    title: "Mã đơn hàng",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "o_name",
    key: "o_name",
  },
  {
    title: "Số điện thoại",
    dataIndex: "o_phone",
    key: "o_phone",
  },
  {
    title: "Tổng tiền",
    dataIndex: "final_amount",
    key: "final_amount",
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "payment_method",
    key: "payment_method",
  },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "stt_payment",
    key: "stt_payment",
  },
  {
    title: "Trạng thái vận chuyển",
    dataIndex: "stt_track",
    key: "stt_track",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 400,
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
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tên người dùng",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Khách hàng",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Trạng thái",
    dataIndex: "is_active",
    key: "is_active",
  },
  {
    title: "Hành động",
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

export const REASONS = [
  "Vi phạm điều khoản sử dụng",
  "Spam hoặc gửi tin rác",
  "Hành vi gian lận",
  "Báo cáo từ người dùng khác",
];

export const STATUSICONS: any = {
  "Chờ xác nhận": "📝",
  "Đang xử lý": "🔄",
  "Đang giao": "🚚",
  "Đã giao": "✅",
  "Đã hủy": "❌",
};

export const SHIPPING_ICONS: any = {
  "Tạo đơn": "📦",
  "Đang lấy hàng": "🤲",
  "Đang vận chuyển": "🚚",
  "Đã giao hàng": "✅",
  "Hoàn hàng": "🔄",
  "Đã nhận hàng hoàn": "🏠",
};

export const ACTIONS_INDEX: any = {
  cancel: {
    label: "Hủy",
    color: "bg-red-500 text-white hover:bg-red-600",
    action: "cancel",
  },
  return: {
    label: "Hoàn hàng trả tiền",
    color: "bg-yellow-500 text-white hover:bg-yellow-600",
    action: "return",
  },
  close: {
    label: "Hoàn tất đơn hàng",
    color: "bg-green-500 text-white hover:bg-green-600",
    action: "close",
  },
  pay: {
    label: "Thanh toán",
    color: "bg-blue-500 text-white hover:bg-blue-600",
    action: "pay",
  },

  refund: {
    label: "Hoàn Hàng/Trả Tiền",
    color: "bg-blue-500 text-white hover:bg-blue-600",
    action: "refund",
  },
};

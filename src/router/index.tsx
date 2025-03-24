import {
  BorderBottomOutlined,
  CommentOutlined,
  ControlOutlined,
  DashboardOutlined,
  DeleteOutlined,
  FileImageOutlined,
  GiftOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PicLeftOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProductDetail from "../components/Products/ProductDetail";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutClient from "../layouts/LayoutClient";
import HomePage from "../page/(main)/home";
import Page404 from "../page/404";
import AboutPage from "../page/about";
import Admin from "../page/admin";
import CategoryAdmin from "../page/admin/categorys";
import AddCategory from "../page/admin/categorys/add";
import CategoryDeleted from "../page/admin/categorys/deleted";
import EditCategory from "../page/admin/categorys/edit";
import ProductsAdmin from "../page/admin/products";
import AddAttribute from "../page/admin/products/attribute/add";
import Attribute from "../page/admin/products/attribute/attribute";
import EditAttribute from "../page/admin/products/attribute/edit";
import AttributeValue from "../page/admin/products/attributeValue/attributeValue";
import Cart from "../page/cart";
import Checkout from "../page/checkout";
import ContactPage from "../page/contact";
import TeamPage from "../page/team";
import AddAttributeValue from "../page/admin/products/attributeValue/add";
import EditAttributeVal from "../page/admin/products/attributeValue/edit";
import CommentAdmin from "../page/admin/comments";
import ProductAdd from "../page/admin/products/add";
import ProductEdit from "../page/admin/products/edit";
import CommentDetail from "../page/admin/comments/detail";
import LazyComponent from "../components/Lazy/LazyComponent";
import AddProductVariantEdit from "../page/admin/products/component/addProductVariantEdit";
import ProductVariant from "../page/admin/products/variant";
import EditProductVariant from "../page/admin/products/component/editProductVariantEdit";
import VariantManage from "../page/admin/products/component/variantManage";
import Login from "../page/auth/login";
import LayoutAuth from "../layouts/AuthLayout";
import OrdersAdmin from "../page/admin/orders";
import OrdersDetail from "../page/admin/orders/components/detail";
import EditOrder from "../page/admin/orders/components/edit";
import VoucherAdmin from "../page/admin/vouchers";
import VoucherDetail from "../page/admin/vouchers/detail";
import AddVoucher from "../page/admin/vouchers/add";
import EditVoucher from "../page/admin/vouchers/edit";
import Register from "../page/auth/register";
import EmloyeeTable from "../page/admin/user";
import Verify from "../page/auth/verify";
import AddImageProducts from "../page/admin/products/image/add";
import ImageList from "../page/admin/products/image/imageList";
import EditImageProduct from "../page/admin/products/image/edit";
import EditUser from "../page/admin/user/components/edit";
import AddUser from "../page/admin/user/components/add";
import PrivateRouter from "./security";
import ForgotPassword from "../page/auth/forgotPassword";
import ResetPassword from "../page/auth/resetPassword";
import AccountSetting from "../page/auth/account";
import AddOrder from "../page/admin/orders/components/add";
import SendOrder from "../page/admin/orders/components/send";
import HiddenComment from "../page/admin/comments/hidden";
import Shop from "../page/Shop";
import ProductAll from "../page/Shop/productAll";
import ProductSearch from "../page/Shop/productSearch";
import OrderHistory from "../page/orders/orderHistory";
import ThankYou from "../page/orders/thank";
import PaymentResult from "../page/checkout/components/paymentResult";
import DeletedProducts from "../page/admin/products/component/deleted";
import { Layout } from "antd";

export const routerClient = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "/",
        element: (
          <LazyComponent>
            <HomePage />
          </LazyComponent>
        ),
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/team",
        element: <TeamPage />,
      },
      {
        path: "/shop/:id",
        element: <Shop />,
      },
      {
        path: "/products",
        element: <ProductAll />,
      },
      {
        path: "/search",
        element: <ProductSearch />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/product/detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/profile",
        element: <AccountSetting />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LayoutAuth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify",
        element: <Verify />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "o",
    element: <Layout />,
    children: [
      {
        path: "orders-history",
        element: <OrderHistory />,
      },
      {
        path: "thanks",
        element: <ThankYou />,
      },
      {
        path: "payment",
        element: <PaymentResult />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <LayoutAdmin />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Admin />,
      },
      {
        path: "products",
        element: (
          <LazyComponent>
            <ProductsAdmin />
          </LazyComponent>
        ),
      },
      {
        path: "product/add",
        element: <ProductAdd />,
      },
      {
        path: "products/edit/:id",
        element: <ProductEdit />,
      },
      {
        path: "category",
        element: <CategoryAdmin />,
      },
      {
        path: "category/add",
        element: <AddCategory />,
      },
      {
        path: "category/edit/:id",
        element: <EditCategory />,
      },
      {
        path: "category/deleted",
        element: <CategoryDeleted />,
      },
      {
        path: "attribute",
        element: <Attribute />,
      },
      {
        path: "attribute/add",
        element: <AddAttribute />,
      },
      {
        path: "attribute/edit/:id",
        element: <EditAttribute />,
      },
      {
        path: "attributeValue/:id",
        element: <AttributeValue />,
      },

      {
        path: "attributeVal/add",
        element: <AddAttributeValue />,
      },
      {
        path: "attributeVal/edit/:id",
        element: <EditAttributeVal />,
      },
      {
        path: "product/image",
        element: <ImageList />,
      },
      {
        path: "image/add",
        element: <AddImageProducts />,
      },
      {
        path: "image/edit",
        element: <EditImageProduct />,
      },
      {
        path: "comments",
        element: <CommentAdmin />,
      },
      {
        path: "comments/:id",
        element: <CommentDetail />,
      },
      {
        path: "comments/hidden",
        element: <HiddenComment />,
      },
      {
        path: "product/:id/variants",
        element: <ProductVariant />,
        exact: true,
      },
      {
        path: "add/product/variant/:id",
        element: <AddProductVariantEdit />,
      },
      {
        path: "product/:idProduct/variants/:idVariant/edit",
        element: <EditProductVariant />,
        exact: true,
      },
      {
        path: "add/product/variant/management/:id/attribute",
        element: <VariantManage />,
      },
      {
        path: "orders",
        element: <OrdersAdmin />,
      },
      {
        path: "orders/:id",
        element: <OrdersDetail />,
      },
      {
        path: "orders/add",
        element: <AddOrder />,
      },

      {
        path: "orders/edit/:id",
        element: <EditOrder />,
      },
      {
        path: "orders/send/:id",
        element: <SendOrder />,
      },
      {
        path: "vouchers/:id",
        element: <VoucherDetail />,
      },
      {
        path: "vouchers/create",
        element: <AddVoucher />,
      },
      {
        path: "vouchers/:id",
        element: <EditVoucher />,
      },
      {
        path: "vouchers",
        element: <VoucherAdmin />,
      },
      {
        path: "users",
        element: <EmloyeeTable />,
      },
      {
        path: "users/add",
        element: <AddUser />,
      },
      {
        path: "users/edit/:id",
        element: <EditUser />,
      },
      {
        path: "deleted",
        element: <DeletedProducts />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

export const TableRouterAdminPage = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: <DashboardOutlined />,
  },
  {
    path: "/dashboard/products",
    name: "Sản phẩm",
    icon: <NotificationOutlined />,
    children: [
      {
        path: "/dashboard/attribute",
        name: "Thuộc tính",
        icon: <UserOutlined />,
      },
      {
        path: "/dashboard/deleted",
        name: "Thùng rác",
        icon: <DeleteOutlined />,
      },
    ],
  },
  {
    name: "Người dùng",
    path: "/dashboard/users",
    icon: <PicLeftOutlined />,
    children: [
      {
        path: "/dashboard/users",
        name: "Danh sách người dùng",
        icon: <UserOutlined />,
      },
      {
        path: "/dashboard/adminUer",
        name: "Quản trị viên",
        icon: <LaptopOutlined />,
      },
    ],
  },
  {
    name: "Danh mục",
    icon: <SlidersOutlined />,
    path: "/dashboard/category",
    children: [
      {
        path: "/dashboard/category/deleted",
        icon: <ControlOutlined />,
        name: "Đã xóa",
      },
    ],
  },
  {
    name: "Bình luận",
    icon: <CommentOutlined />,
    path: "/dashboard/comments",
    children: [
      {
        path: "/dashboard/category/deleted",
        icon: <ControlOutlined />,
        name: "Đã xóa",
      },
    ],
  },
  {
    name: "Mã giảm giá",
    icon: <GiftOutlined />,
    path: "/dashboard/vouchers",
    children: [
      {
        path: "/dashboard/category/deleted",
        icon: <ControlOutlined />,
        name: "Đã xóa",
      },
    ],
  },
  {
    name: "Đơn hàng",
    icon: <BorderBottomOutlined />,
    path: "/dashboard/orders",
  },
  {
    path: "/dashboard/product/image",
    name: "Danh sách ảnh",
    icon: <FileImageOutlined />,
  },
];

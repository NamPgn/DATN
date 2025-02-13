import {
  CommentOutlined,
  ControlOutlined,
  DashboardOutlined,
  FileImageOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PicLeftOutlined,
  RetweetOutlined,
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
import Shop from "../page/shop";
import TeamPage from "../page/team";
import PrivateRouter from "./security";
import AddAttributeValue from "../page/admin/products/attributeValue/add";
import EditAttributeVal from "../page/admin/products/attributeValue/edit";
import ProductAdd from "../page/admin/products/add";
import ProductEdit from "../page/admin/products/edit";
import ImageList from "../page/admin/products/image/imageList";
import AddImageProducts from "../page/admin/products/image/add";
import EditImageProduct from "../page/admin/products/image/edit";
import CommentAdmin from "../page/admin/comments";
import LazyComponent from "../components/Lazy/LazyComponent";

export const routerClient = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/detail/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      // <PrivateRouter>
      <LayoutAdmin />
      // </PrivateRouter>
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
    name: "Admin",
    icon: <DashboardOutlined />,
  },
  {
    path: "/dashboard/products",
    name: "Products",
    icon: <NotificationOutlined />,
    children: [
      {
        path: "/dashboard/attribute",
        name: "Attribute",
        icon: <UserOutlined />,
      },
      {
        path: "/dashboard/product/image",
        name: "Image List",
        icon: <FileImageOutlined />,
      },
   
    ],
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
        path: "/dashboard/category/deleted",
        icon: <ControlOutlined />,
        name: "Deleted",
      },
    ],
  },
  {
    name: "Comment",
    icon: <CommentOutlined />,
    path: "/dashboard/comments",
    children: [
      {
        path: "/dashboard/category/deleted",
        icon: <ControlOutlined />,
        name: "Deleted",
      },
    ],
  },
];

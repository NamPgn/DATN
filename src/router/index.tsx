import {
  ControlOutlined,
  DashboardOutlined,
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
        element: <ProductsAdmin />,
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
      // {
      //   path: "attributeValValue/:id",
      //   element: <AttributeValValue />,
      // },
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
    path: "/products",
    name: "Products",
    icon: <NotificationOutlined />,
    children: [
      {
        path: "/dashboard/attribute",
        name: "Attribute",
        icon: <UserOutlined />,
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

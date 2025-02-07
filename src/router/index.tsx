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
import Cart from "../page/cart";
import Checkout from "../page/checkout";
import ContactPage from "../page/contact";
import Shop from "../page/Shop";
import TeamPage from "../page/team";
// import PrivateRouter from "./security";

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
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

import { useRoutes } from "react-router-dom";
import { routerClient } from "./router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/reset.css";
const App = () => {
  const router = useRoutes(routerClient);
  return <>{router}</>;
};

export default App;

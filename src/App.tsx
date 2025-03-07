import { useRoutes } from "react-router-dom";
import { routerClient } from "./router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/reset.css";
import { ToastContainer } from "react-toastify";
import "react-quill/dist/quill.snow.css";
const App = () => {
  const router = useRoutes(routerClient);
  return (
    <>
      {router}
      <ToastContainer />
    </>
  );
};

export default App;

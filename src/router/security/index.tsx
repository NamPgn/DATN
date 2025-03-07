import { Link, Navigate } from "react-router-dom";
import { isAuthentication } from "../../common/auth/getToken";

const PrivateRouter = (props: any) => {
  const data = isAuthentication();
  try {
    if (data) {
      if (data.user.role === "member") {
        return <Navigate to={"/"} />;
      } else {
        return props.children;
      }
    } else {
      return <Navigate to={"/"} />;
    }
  } catch (error) {
    return (
      <div className="text-light container text-center">
        <Link to={"/signin"}>Đăng nhập</Link>
      </div>
    );
  }
};

export default PrivateRouter;

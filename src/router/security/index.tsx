import { Link, Navigate } from "react-router-dom";
import { isAuthentication } from "../../common/auth/getToken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRouter = (props: any) => {
  const data = isAuthentication();
  try {
    if (data) {
      if (data.user.role == null) {
        return <Navigate to={"/"} />;
      } else {
        return props.children;
      }
    } else {
      return <Navigate to={"/"} />;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return (
      <div className="text-light container text-center">
        <Link to={"/signin"}>Đăng nhập</Link>
      </div>
    );
  }
};

export default PrivateRouter;

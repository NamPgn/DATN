/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import {
  LineChartOutlined,
  LogoutOutlined,
  SettingOutlined,
  SmileOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { Link, useNavigate } from "react-router-dom";
import MVRow from "../../Core/MV/Grid";
import MVCol from "../../Core/MV/Grid/Col";
import MVText from "../../Core/MV/Text";
import MVTitle from "../../Core/MV/Title";
import { MVAvatar } from "../../Core/Avatar";
import { toast } from "react-toastify";
import { UsersContext } from "../../../../context/usersContext";
import { useCart } from "../../../../context/Cart/cartContext";
const AuthHeader = () => {
  const { isLogin, setIslogin, token, userId }: any =
    useContext(UsersContext) || {};
  const { mutate }: any = useCart();
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("checkId");
    localStorage.removeItem("cart");
    mutate();
    toast.success("Đăng xuất thành công");
    setIslogin(false);
    nav("/");
  };

  return (
    <>
      {token?.user || isLogin == true ? (
        <Popover
          placement="bottom"
          content={
            <>
              <Link to={"/orders"}>
                <MVRow style={{ lineHeight: "0" }} align={"middle"} gutter={12}>
                  <MVCol>
                    <UnorderedListOutlined />
                  </MVCol>
                  <MVCol>
                    <MVText level={6} className="auth">
                      Đơn hàng
                    </MVText>
                  </MVCol>
                </MVRow>
              </Link>
              <Link to={"/profile"}>
                <MVRow style={{ lineHeight: "0" }} align={"middle"} gutter={12}>
                  <MVCol>
                    <SettingOutlined />
                  </MVCol>
                  <MVCol>
                    <MVText level={6} className="auth">
                      Thông tin
                    </MVText>
                  </MVCol>
                </MVRow>
              </Link>
              {token?.user && token?.user?.role == "admin" && (
                <Link to={"/dashboard"}>
                  <MVRow
                    style={{ lineHeight: "0" }}
                    align={"middle"}
                    gutter={[12, 12]}
                  >
                    <MVCol>
                      <LineChartOutlined />
                    </MVCol>
                    <MVCol>
                      <MVText className="auth">Quản trị</MVText>
                    </MVCol>
                  </MVRow>
                </Link>
              )}
              {token?.user && token?.user?.role == "staff" && (
                <Link to={"/dashboard"}>
                  <MVRow
                    style={{ lineHeight: "0" }}
                    align={"middle"}
                    gutter={[12, 12]}
                  >
                    <MVCol>
                      <LineChartOutlined />
                    </MVCol>
                    <MVCol>
                      <MVText className="auth">Quản trị</MVText>
                    </MVCol>
                  </MVRow>
                </Link>
              )}
              <MVRow
                style={{ lineHeight: "0" }}
                align={"middle"}
                gutter={[12, 12]}
              >
                <MVCol>
                  <LogoutOutlined />
                </MVCol>
                <MVCol>
                  <MVText
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </MVText>
                </MVCol>
              </MVRow>
            </>
          }
          title={
            <MVTitle
              style={{
                textTransform: "uppercase",
              }}
              type={"secondary"}
              level={5}
            >
              {token?.user?.username}
            </MVTitle>
          }
          trigger="click"
        >
          <MVAvatar
            className="text-center"
            title={token?.user?.name}
            size={"sm"}
            src={userId ? userId.avatar : <UserOutlined />}
          />
        </Popover>
      ) : (
        <Popover
          placement="bottomRight"
          content={
            <Link to={"/auth/login"}>
              <MVRow align={"middle"} gutter={[12, 12]}>
                <MVCol>
                  <SmileOutlined />
                </MVCol>
                <MVCol>
                  <MVText level={6} className="auth">
                    Signin
                  </MVText>
                </MVCol>
              </MVRow>
            </Link>
          }
          title={
            <MVTitle
              style={{
                textTransform: "uppercase",
              }}
              level={5}
            >
              {"Hi"}
            </MVTitle>
          }
          trigger="click"
        >
          <MVAvatar
            title={token?.user?.name}
            src={undefined}
            size={40}
            icon={<UserOutlined />}
          />
        </Popover>
      )}
    </>
  );
};

export default AuthHeader;

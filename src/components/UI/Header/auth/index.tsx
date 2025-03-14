/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import {
  LikeOutlined,
  LogoutOutlined,
  SmileOutlined,
  UserOutlined,
  UsergroupAddOutlined,
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
const AuthHeader = () => {
  const { isLogin, setIslogin, token }: any = useContext(UsersContext) || {};
  const handleCheckCart = () => {
    // if (!user) {
    //   MVError("Bạn cần đăng nhập!");
    // } else {
    //   navigate("/cart/user");
    // }
  };
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("checkId");
    localStorage.removeItem("cart");
    toast.success("Đăng xuất thành công");
    setIslogin(false);
    nav("/");
  };

  return (
    <React.Fragment>
      {token?.user || isLogin == true ? (
        <Popover
          placement="bottomRight"
          content={
            <>
              <Link to={"/profile"}>
                <MVRow style={{ lineHeight: "0" }} align={"middle"} gutter={12}>
                  <MVCol>
                    <UsergroupAddOutlined />
                  </MVCol>
                  <MVCol>
                    <MVText level={6} className="auth">
                      Your profile
                    </MVText>
                  </MVCol>
                </MVRow>
              </Link>
              <MVRow
                style={{ lineHeight: "0" }}
                align={"middle"}
                gutter={[12, 12]}
              >
                <MVCol>
                  <LikeOutlined />
                </MVCol>
                <MVCol>
                  <MVText
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={handleCheckCart}
                    className="auth"
                  >
                    Saved
                  </MVText>
                </MVCol>
              </MVRow>
              {token?.user && token?.user?.role == "admin" && (
                <Link to={"/dashboard"}>
                  <MVRow
                    style={{ lineHeight: "0" }}
                    align={"middle"}
                    gutter={[12, 12]}
                  >
                    <MVCol>
                      <UserOutlined />
                    </MVCol>
                    <MVCol>
                      <MVText className="auth">Admin</MVText>
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
                    Logout
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
            src={token?.user?.avatar}
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
    </React.Fragment>
  );
};

export default AuthHeader;

import React from "react";
import {
  LikeOutlined,
  LogoutOutlined,
  SmileOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Popover, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import MVRow from "../../Core/MV/Grid";
import MVCol from "../../Core/MV/Grid/Col";
import MVText from "../../Core/MV/Text";
import MVTitle from "../../Core/MV/Title";
import { MVAvatar } from "../../Core/Avatar";
const AuthHeader = ({ auths }: any) => {
  const handleCheckCart = () => {
    // if (!auths) {
    //   MVError("Bạn cần đăng nhập!");
    // } else {
    //   navigate("/cart/user");
    // }
  };

  return (
    <React.Fragment>
      {auths ? (
          <Popover
            placement="bottom"
            content={
              <>
                <Link to={"/profile"}>
                  <MVRow
                    style={{ lineHeight: "0" }}
                    align={"middle"}
                    gutter={12}
                  >
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
                {auths.user && auths?.user?.role >= 1 && (
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
                {auths?.user?.username}
              </MVTitle>
            }
            trigger="click"
          >
            <MVAvatar
              className="text-center"
              title={auths?.user?.name}
              size={"sm"}
            />
          </Popover>
      ) : (
          <Popover
       
          placement="bottom"
            content={
              <Link to={"/signin"}>
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
              title={auths?.user?.name}
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

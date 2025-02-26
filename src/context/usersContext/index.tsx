import { createContext, useState } from "react";
import { isAuthentication } from "../../common/auth/getToken";

const Auth: any = isAuthentication();

export const UsersContext: any = createContext(null);
export const UserContextProvider = (props: any) => {
  const token = isAuthentication();
  const isAuth = !!token;

  const [reset, setReset] = useState(false);
  const [isLogin, setIslogin] = useState(!!localStorage.getItem("isLogin"));

  const value: any = {
    isAuth: isAuth,
    setReset,
    setIslogin,
    isLogin,
    token,
  };
  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  );
};

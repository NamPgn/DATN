import { createContext, useState } from "react";
import { isAuthentication } from "../../common/auth/getToken";


export const UsersContext: any = createContext(null);
export const UserContextProvider = (props: any) => {
  const token = isAuthentication();
  const isAuth = !!token;

  const [isLogin, setIslogin] = useState(!!localStorage.getItem("isLogin"));

  const value: any = {
    isAuth: isAuth,
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

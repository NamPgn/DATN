import { createContext, useState } from "react";
import { isAuthentication } from "../../common/auth/getToken";
import { useQuery } from "react-query";
import { getUserId, getUserInfo } from "../../sevices/users";

export const UsersContext: any = createContext(null);
export const UserContextProvider = (props: any) => {
  const token = isAuthentication();
  const isAuth = !!token;

  const [isLogin, setIslogin] = useState(!!localStorage.getItem("isLogin"));
  const {
    data: userId,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userId", token?.user?.id],
    queryFn: async () => {
      return (await getUserInfo()).data?.data;
    },
    enabled: !!token,
    onSuccess: () => {},
    onError: () => {
      return {};
    },
  });
  const value: any = {
    isAuth: isAuth,
    setIslogin,
    isLogin,
    token,
    userId,
    isLoading,
    refetch,
  };
  return (
    <UsersContext.Provider value={value}>
      {props.children}
    </UsersContext.Provider>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { isAuthentication } from "../../common/auth/getToken";
import { useQuery } from "react-query";
import { getUserInfo } from "../../sevices/users";

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
    staleTime: 5 * 60 * 1000,
		cacheTime: 30 * 60 * 1000
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

import { token_auth } from "../../common/auth/getToken";
import intances from "../instances";

export const getNotify = async () => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intances.get(`/notifications`, { headers });
};

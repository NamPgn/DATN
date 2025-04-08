import { token_auth } from "../../common/auth/getToken";
import { intancesLocal } from "../instances";
const token_ = token_auth();
export const getCart = async (data: any) => {
  return intancesLocal.post(`/variation`, data);
};

export const cartSync = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.post(`/cart/sync`, data, {
    headers,
  });
};

export const userCart = async () => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.get(`/cart`, {
    headers,
  });
};

export const userCartDelete = async (id: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.delete(`/cart/${id}`, {
    headers
  });
};

export const userCartAdd = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.post(`/cart`, data, {
    headers,
  });
};

export const changeCartAdd = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.put(`/cart/${data?.cart_item_id}`, data, {
    headers
  });
};

export const userCartClear = async () => {
  return intancesLocal.post(`/cart/clear`, null, {
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};

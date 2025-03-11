import { token_auth } from "../../common/auth/getToken";
import { intancesLocal } from "../instances";
const token_ = token_auth();
export const getCart = async (data: any) => {
  return intancesLocal.post(`/variation`, data);
};

export const cartSync = async (data: any) => {
  return intancesLocal.post(`/cart/sync`, data, {
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};

export const userCart = async () => {
  return intancesLocal.get(`/cart`, {
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};

export const userCartDelete = async (id: any) => {
  return intancesLocal.delete(`/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};

export const userCartAdd = async (data: any) => {
  return intancesLocal.post(`/cart`, data, {
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};

export const changeCartAdd = async (data: any) => {
  return intancesLocal.put(`/cart/${data?.cart_item_id}`, data, {
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};

export const userCartClear = async () => {
  return intancesLocal.post(`/cart/clear`, null,{
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { token_auth } from "../../common/auth/getToken";
import { intancesLocal } from "../instances";
export const applyVoucher = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }

  return intancesLocal.post(`/voucher/apply-voucher`, data, { headers });
};

export const getVouchers = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }

  return intancesLocal.get(`/voucher`, data);
};

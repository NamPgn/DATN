import intances from "./instances";

export const getVouchers = async (page: number) => {
  return intances.get("/vouchers?page=" + page);
};

export const getVoucher = async (code: string) => {
  return intances.get(`/vouchers/${code}`);
};

export const delVouchers = async (code: string) => {
  return intances.delete(`/vouchers/delete/${code}`);
};

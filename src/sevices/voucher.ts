import intances from "./instances";

export const getVouchers = async (page: number) => {
  return intances.get("/vouchers?page=" + page);
};

export const getVoucher = async (code: string | undefined) => {
  return intances.get(`/vouchers/${code}`);
};

export const delVouchers = async (code: string) => {
  return intances.delete(`/vouchers/delete/${code}`);
};

export const createVoucher = async (data: string) => {
  return intances.post(`/vouchers/create`, data);
};

export const updateVoucher = async (data: string, id: string | undefined) => {
  return intances.put(`/vouchers/update/${id}`, data);
};

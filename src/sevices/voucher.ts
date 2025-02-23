import intances from "./instances";

export const getVouchers = async (page: number) => {
  return intances.get("/vouchers?page=" + page);
};

export const getVoucher = async (id: string | undefined) => {
  return intances.get(`/vouchers/${id}`);
};

export const delVouchers = async (id: string) => {
  return intances.delete("/vouchers/", {
    data: { ids: [id] },
    headers: { "Content-Type": "application/json" },
  });
};

export const delMultipleVouchers = async (ids: string[]) => {
  return intances.delete("/vouchers/", {
    data: { ids },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createVoucher = async (data: string) => {
  return intances.post(`/vouchers/create`, data);
};

export const updateVoucher = async (data: string, id: string | undefined) => {
  return intances.post(`/vouchers/update/${id}`, data);
};

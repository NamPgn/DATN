import intances from "./instances";

export const getOrders = async (page: number) => {
  return intances.get("/orders?page=" + page);
};

export const getOrder = async (id: any) => {
  return intances.get("/orders/" + id);
};

export const updateOrders = async (data: any) => {
  return intances.patch("/orders/" + Number(data?.id), data);
};

export const delOrders = async (id: string) => {
  return intances.delete("/orders/" + id);
};

export const addOrders = async (data: any) => {
  return intances.post("/orders", data);
};

export const variantsOrders = async (id: any) => {
  return intances.get(`/orders/${id}/variants`);
};

export const getVariantsOrders = async (id: any) => {
  return intances.get(`/orders/${id}/attributes`);
};

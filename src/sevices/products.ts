import intances from "./instances";

export const getProducts = async (id: number) => {
  return intances.get("/product/list/" + id);
};

export const getProduct = async (id: any) => {
  return intances.get("/product/update/" + id);
};

export const updateProduct = async (id: any, data: any) => {
  return intances.put("/product/update/" + id, data);
};

export const delProduct = async (id: string) => {
  return intances.delete("/product/delete/" + id);
};
export const addProduct = async (data: any) => {
  return intances.post("/product/create", data);
};

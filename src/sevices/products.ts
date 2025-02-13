import intances from "./instances";

export const getProducts = async (page: number) => {
  return intances.get("/products?page=" + page);
};

export const getProduct = async (id: any) => {
  return intances.get("/products/" + id);
};

export const updateProduct = async (id: any, data: any) => {
  return intances.put("/products/" + id, data);
};

export const delProduct = async (id: string) => {
  return intances.delete("/products/" + id);
};

export const addProduct = async (data: any) => {
  return intances.post("/products", data);
};

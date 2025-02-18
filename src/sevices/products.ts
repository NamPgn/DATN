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

export const variantsProduct = async (id: any) => {
  return intances.get(`/products/${id}/variants`);
};

export const getVariantsProduct = async (id: any) => {
  return intances.get(`/products/${id}/attributes`);
};

export const getVariantsProductList = async (id: any) => {
  return intances.get(`/products/${id}/variants/list`);
};

export const addVariantsProduct = async (id: any, data: any) => {
  return intances.get(`/products/${id}/variants`, data);
};

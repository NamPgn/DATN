/* eslint-disable @typescript-eslint/no-explicit-any */
import intances, { intancesLocal } from "./instances";

export const getProducts = async (page: number) => {
  return intances.get("/products?page=" + page);
};

export const getProductsOrder = async (page: number) => {
  return intances.get("/list_product_order?page=" + page);
};

export const getProduct = async (id: any) => {
  return intances.get("/products/" + id);
};

export const updateProduct = async ( data: any) => {
  return intances.put("/products/" + data?.id, data);
};

export const delProduct = async (id: string) => {
  return intances.delete("/products", {
    data: { ids: [id] },
    headers: { "Content-Type": "application/json" },
  });
};

export const delMultipleProduct = async (ids: string[]) => {
  return intances.delete("/products", {
    data: { ids },
    headers: { "Content-Type": "application/json" },
  });
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
  return intances.post(`/products/${id}/variants`, data);
};

export const getVariantsProductEdit = async (
  idProduct: any,
  idVariant: any
) => {
  return intances.get(`/products/${idProduct}/variants/${idVariant}`);
};

export const editVariantsProduct = async (
  idProduct: any,
  idVariant: any,
  data: any
) => {
  return intances.put(`/products/${idProduct}/variants/${idVariant}`, data);
};

export const deleteVariantsProduct = async (data: any) => {
  return intances.delete(`/variants/${data}`);
};

export const getProductsClient = async () => {
  return intancesLocal.get("/latest-products");
};

export const getProductsDetailClient = async (id: any) => {
  return intancesLocal.get("/product_detail/" + id);
};

export const getsProductsDeleted = async () => {
  return intances.get("/products/trash");
};

export const productsHardDeleted = async (data: any) => {
  return intances.delete("/products/hard-delete", data);
};

export const productsRetoreDeleted = async (data: any) => {
  return intances.delete("/products/retore-delete", data);
};

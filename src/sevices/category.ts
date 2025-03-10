/* eslint-disable @typescript-eslint/no-explicit-any */
import intances from "./instances";

export const getCategorys = async (page: number) => {
  return intances.get("/categories?page=" + page);
};

export const getCategorysAll = async () => {
  return intances.get("/categories/list");
};

export const getCategorysFather = async () => {
  return intances.get("/categories/get-all-categories");
};

export const delCategorys = async (id: string) => {
  return intances.delete("/categories/delete/" + id);
};

export const addCategory = async (data: any) => {
  return intances.post("/categories/create", data);
};

export const getCategory = async (id: any) => {
  return intances.get("/categories/update/" + id);
};

export const updateCategory = async (id: any, data: any) => {
  return intances.put("/categories/update/" + id, data);
};

export const getsCategoryDeleted = async () => {
  return intances.get("/categories/trash");
};

export const retoreCategoryDeleted = async (id: string) => {
  return intances.put("/categories/restore/" + id);
};

export const deleteHardCategorys = async (id: string) => {
  return intances.delete("/categories/hard-delete/" + id);
};

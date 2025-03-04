/* eslint-disable @typescript-eslint/no-explicit-any */
import intances from "./instances";

export const getImageLists = async (page: number) => {
  return intances.get("/libraries?page=" + page);
};

export const getImageList = async (id: any) => {
  return intances.get("/imageList/update/" + id);
};

export const updateImageList = async (id: any, data: any) => {
  return intances.put("/imageList/update/" + id, data);
};

export const delImageList = async (id: string) => {
  return intances.delete("/imageList/delete/" + id);
};
export const addImageList = async (data: any) => {
  return intances.post("/libraries", data);
};

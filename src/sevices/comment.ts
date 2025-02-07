import intances from "./instances";

export const getComments = async (page: number) => {
  return intances.get("/comments?page=" + page);
};

export const delComments = async (id: string) => {
  return intances.delete("/comments/" + id);
};

export const addComment = async (data: any) => {
  return intances.post("/comments", data);
};

export const getComment = async (id: any) => {
  return intances.get("/comments/" + id);
};

export const updateComment = async (id: any, data: any) => {
  return intances.put("/comments/" + id, data);
};

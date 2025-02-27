import intances from "./instances";

export const getComments = async (page: number) => {
  return intances.get("/comments?page=" + page);
};

export const getComment = async (id: string) => {
  return intances.get(`/comments/${id}`);
};

export const delComments = async (id: string) => {
  return intances.delete("/comments/delete", {
    data: { id: [id] },
    headers: { "Content-Type": "application/json" },
  });
};

export const delMultipleComments = async (ids: string[]) => {
  return intances.delete("/comments/delete", {
    data: { id: ids },
    headers: { "Content-Type": "application/json" },
  });
};

export const statusComment = async (id: string, status: boolean) => {
  return intances.patch("/comments/status", {
    data: { id: [id], status },
    headers: { "Content-Type": "application/json" },
  });
};

export const statusMutipleComment = async (ids: string[], status: boolean) => {
  return intances.patch("/comments/status", {
    data: { id: ids, status },
    headers: { "Content-Type": "application/json" },
  });
};

export const hiddenComment = async () => {
  return intances.get("/comments/hidden");
};

export const searchComment = async (keyword?: string, rating?: number) => {
  return intances.get("/comments/search", { params: { keyword, rating } });
};

export const replyComment = async (id: string, reply: string) => {
  return intances.patch("/comments/reply", { id, reply });
};

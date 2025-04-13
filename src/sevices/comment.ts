/* eslint-disable @typescript-eslint/no-explicit-any */
import intances from "./instances";

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

export const statusMutipleComment = async (data: any) => {
  console.log(data);
  return intances.patch("/comments/status", data);
};

export const hiddenComment = async () => {
  return intances.get("/comments/hidden");
};

export const getComments = async (
  page: number,
  keyword?: string,
  rating?: number,
  is_active?: string
) => {
  const params: Record<string, any> = { page };
  if (keyword) params.keyword = keyword;
  if (rating !== undefined) params.rating = rating;
  
  return intances.get("/comments?page=" + page + "&is_active=" + is_active , { params });
};

export const replyComment = async (id: string, reply: string) => {
  return intances.put(`comments/${id}/reply`, { reply });
};

export const changeStatusComment = async (id: string, status: boolean, reason?: string) => {
  const response = await intances.put(`/comments/${id}/status-toggle`, {
    status,
    ...(reason && { reason })
  });
  return response.data;
};

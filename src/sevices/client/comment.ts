/* eslint-disable @typescript-eslint/no-explicit-any */
import { intancesLocal } from "../instances";

export const getCommentClient = async (
  id: number,
  page: number,
  rating?: number
) => {
  return intancesLocal.get(`products/${id}/reviews`, {
    params: { page, ...(rating !== undefined ? { rating } : {}) },
  });
};

export const addCommentClient = async (commentData: any) => {
  return intancesLocal.post(`reviews`, commentData);
};

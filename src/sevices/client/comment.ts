/* eslint-disable @typescript-eslint/no-explicit-any */
import { intancesLocal } from "../instances";

export const getCommentClient = async (
  id: number,
  page: number,
  rating?: number
) => {
  return intancesLocal.get(`/reviews/${id}`, {
    params: { page, ...(rating !== undefined ? { rating } : {}) },
  });
};

export const getReviewTotal = async (
  id: number,
) => {
  return intancesLocal.get(`/reviews/${id}/statistics`);
};


export const addCommentClient = async (commentData: any) => {
  return intancesLocal.post(`reviews`, commentData);
};



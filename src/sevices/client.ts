/* eslint-disable @typescript-eslint/no-explicit-any */
import { intancesLocal } from "./instances";

export const getProductsByCategory = async (page: any) => {
  return intancesLocal.get(`products/${page}?category=`);
};

export const getProductsSearch = async (keyword: string, page: number) => {
  return intancesLocal.get(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { intancesLocal } from "./instances";

export const getProductsByCategory = async (slug: string) => {
  return intancesLocal.get(`/categories/${slug}/products`);
};

export const getProductsSearch = async (keyword: string, page: number) => {
  return intancesLocal.get(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
};

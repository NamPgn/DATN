/* eslint-disable @typescript-eslint/no-explicit-any */
import { intancesLocal } from "./instances";

export const getProductsByCategory = async (slug: string, params: string) => {
  return intancesLocal.get(`/categories/${slug}/products${params}`);
};

export const getProducts = async (sort?: string) => {
  let url = `products`;
  if (sort && sort !== "default") {
    url += `?sort=${sort}`;
  }
  return intancesLocal.get(url);
};

export const getProductsSearch = async (keyword: string, page: number) => {
  return intancesLocal.get(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
};

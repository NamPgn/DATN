/* eslint-disable @typescript-eslint/no-explicit-any */
import { intancesLocal } from "./instances";

export const getProductsByCategory = async (slug: string, page: any) => {
  return intancesLocal.get(`/categories/${slug}/products${page}`);
};

export const getProducts = async (page: any) => {
  return intancesLocal.get(`products?page=${page}`);
};

export const getProductsSearch = async (keyword: string, page: number) => {
  return intancesLocal.get(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
};

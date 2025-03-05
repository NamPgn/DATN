import { intancesLocal } from "./instances";

export const getProductsByCategory = async (page: number) => {
  return intancesLocal.get(`/products/?page=${page}`);
};

export const getProductsSearch = async (keyword: string, page: number) => {
  return intancesLocal.get(
    `/search?keyword=${encodeURIComponent(keyword)}&page=${page}`
  );
};

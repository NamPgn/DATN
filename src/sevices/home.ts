import { intancesLocal } from "./instances";

export const getHomes = async () => {
  return intancesLocal.get("/latest-products");
};

export const searchHome = async (keyword: string) => {
  return intancesLocal.get(`/search?keyword=${encodeURIComponent(keyword)}`);
};

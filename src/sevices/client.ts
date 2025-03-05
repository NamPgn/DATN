import { intancesLocal } from "./instances";

export const getProductsByCategory = async (page:number) => {
  return intancesLocal.get(`products/?page=${page}`);
};

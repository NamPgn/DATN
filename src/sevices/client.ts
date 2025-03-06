import { intancesLocal } from "./instances";

export const getProductsByCategory = async (page: any) => {
  return intancesLocal.get(`products/${page}`);
};

import { intancesLocal } from "../instances";

export const getProductByCategory = async (id: string) => {
  return intancesLocal.get(`/categories/${id}/products`);
};

export const getCategory = async () => {
    return intancesLocal.get(`/categories`);
  };
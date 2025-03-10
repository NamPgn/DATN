import { intancesLocal } from "../instances";

export const getCart = async (data: any) => {
  return intancesLocal.post(`/variation`, data);
};

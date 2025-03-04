/* eslint-disable @typescript-eslint/no-explicit-any */
import { intancesLocal } from "./instances";

export const getHomes = async () => {
  return intancesLocal.get("/latest-products");
};

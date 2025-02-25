import intances, { intancesLocal } from "./instances";

export const login = async (data: any) => {
  return intancesLocal.post("/login", data);
};

export const register = async (data: any) => {
  return intancesLocal.post("/register", data);
};

export const getUsers = async (page: number) => {
  return intances.get("/users?page=" + page);
};

export const deleteUser = async (id: any) => {
  return intances.delete("/users/" + id);
};

export const updateUser = async (data: any) => {
  return intances.put("/users/" + data?.id, data);
};

export const getUser = async (id: any) => {
  return intances.get("/users/" +  id);
};

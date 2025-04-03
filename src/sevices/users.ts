import intances, { intancesLocal, intancesLogout } from "./instances";
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
  return intances.get("/users/" + id);
};

export const addUser = async (data: any) => {
  return intances.post("/users", data);
};

export const getVerify = async (token: any) => {
  return intancesLocal.get("/verify_email?token=" + token);
};

export const blockUser = async (data: any) => {
  return intances.post("/users/change_status/" + data.id, data);
};

export const unLockUser = async (data: any) => {
  return intances.post("/users/change_status/" + data.id, null);
};

export const sendEmailForgotPass = async (data: any) => {
  return intancesLocal.post("/forgot-password", data);
};

export const sendResetPS = async (data: any) => {
  return intancesLocal.post("/reset-password", data);
};

export const logout = async () => {
  return intancesLogout.post("/logout", null);
};

export const getUserId = async (id: any) => {
  return intancesLogout.get("/admin/users/" + id);
};

export const loginGoogle = async (response: any) => {
  return intancesLocal.post("/auth/google/callback", response);
};

export const getUserInfo = async () => {
  return intancesLogout.get("/profile");
};

export const changeUserInfo = async (data: any) => {
  return intancesLogout.post("/change_profile", data);
};

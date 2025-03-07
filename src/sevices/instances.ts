import axios from "axios";
import { token_auth } from "../common/auth/getToken";
const intances = axios.create({
  baseURL: import.meta.env.VITE_DATABASE || "http://127.0.0.1:8000/api/admin",
});

export const intancesLogout = axios.create({
  baseURL:
    import.meta.env.VITE_DATABASE_LOCAL || "http://127.0.0.1:8000/api/admin",
});

export const intancesLocal = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_LOCAL,
});
intances.interceptors.request.use((config) => {
  const token = token_auth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
intancesLogout.interceptors.request.use((config) => {
  const token = token_auth();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default intances;

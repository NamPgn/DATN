import axios from "axios";
const intances = axios.create({
  baseURL: import.meta.env.VITE_DATABASE || "http://127.0.0.1:8000/api/admin",
});

export const intancesLocal = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_LOCAL,
});

export default intances;

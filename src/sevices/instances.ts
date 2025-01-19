import axios from "axios";
const intances = axios.create({
  baseURL: import.meta.env.VITE_DATABASE,
});

export default intances;

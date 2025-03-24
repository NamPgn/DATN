import intances from "./instances";

export const dashboard = async () => {
  return intances.get("/dashboard");
};
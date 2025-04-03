import intances from "./instances";

export const dashboard = async (year?: number) => {
  return intances.get("/dashboard");
};

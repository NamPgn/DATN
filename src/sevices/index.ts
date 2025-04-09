import intances from "./instances";

export const dashboard = async (year?: number, isLast7Days?: boolean) => {
  return intances.get("/dashboard");
};

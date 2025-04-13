import intances from "./instances";

export const dashboard = async (startDate?: string, endDate?: string) => {
  return intances.get("/dashboard", { params: { startDate, endDate } });
};

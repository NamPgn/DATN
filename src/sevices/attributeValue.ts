import intances from "./instances";

export const getAttributesVals = async (id: number) => {
  return intances.get("/attribute_values/list/" + id);
};

export const getAttributesVal = async (id: any) => {
  return intances.get("/attribute_values/update/" + id);
};

export const updateAttributesVal = async (id: any, data: any) => {
  return intances.put("/attribute_values/update/" + id, data);
};

export const delAttributesVal = async (id: string) => {
  return intances.delete("/attribute_values/delete/" + id);
};
export const addAttributesVal = async (data: any) => {
  return intances.post("/attribute_values/create", data);
};

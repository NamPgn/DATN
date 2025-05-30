import intances from "./instances";

export const getAttributes = async (page: number) => {
  return intances.get("/attributes?page=" + page);
};
export const getAttributesAll = async () => {
  return intances.get("/attribute_values/list");
};

export const delAttributes = async (id: string) => {
  return intances.delete("/attributes/" + id);
};

export const addAttribute = async (data: any) => {
  return intances.post("/attributes", data);
};

export const getAttribute = async (id: any) => {
  return intances.get("/attributes/" + id);
};

export const updateAttribute = async (id: any, data: any) => {
  return intances.put("/attributes/" + id, data);
};

// export const deleteAttributeVariant = async (id: any) => {
//   return intances.delete("/attributes/delete-attributes/" + id);
// };

export const getAttributesProduct = async (id: any) => {
  return intances.get(`/products/${id}/attributes`);
};

export const addAttributeVariant = async (data: any) => {
  return intances.put(`products/${data?.id}/attributes`, data);
};

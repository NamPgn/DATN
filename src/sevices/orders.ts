import axios from "axios";
import intances, { intancesLocal } from "./instances";

export const getOrders = async (page: number, searchParams: any) => {
  return intances.get("/orders?page=" + page, {
    params: searchParams
  });
};

export const getOrder = async (id: any) => {
  return intances.get("/orders/" + id);
};

export const updateOrders = async (data: any) => {
  return intancesLocal.post(`/ghn/post_order/${data?.id}`, data);
};

export const sendOrders = async (data: any) => {
  return intances.put(`/orders/${data?.id}/edit`, data);
};

export const delOrders = async (id: string) => {
  return intances.delete("/orders/" + id);
};

export const addOrders = async (data: any) => {
  return intances.post("/orders/create", data);
};

export const variantsOrders = async (id: any) => {
  return intances.get(`/orders/${id}/variants`);
};

export const getVariantsOrders = async (id: any) => {
  return intances.get(`/orders/${id}/attributes`);
};

export const getApiOrderAdress = async () => {
  return axios.get(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
    {
      headers: {
        token: "08bdc043-cef6-11ef-b2e4-6ec7c647cc27",
      },
    }
  );
};

export const postApiOrderDistrict = async (data: any) => {
  return axios.post(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
    data,
    {
      headers: {
        token: "08bdc043-cef6-11ef-b2e4-6ec7c647cc27",
      },
    }
  );
};

export const postApiOrderWard = async (data: any) => {
  return axios.post(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
    data,
    {
      headers: {
        token: "08bdc043-cef6-11ef-b2e4-6ec7c647cc27",
      },
    }
  );
};

export const getApiShiping = async (data: any) => {
  return axios.post(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
    data,
    {
      headers: {
        token: "08bdc043-cef6-11ef-b2e4-6ec7c647cc27",
      },
    }
  );
};

export const postApiOrderGetShip = async (data: any) => {
  return intancesLocal.post(
    "http://127.0.0.1:8000/api/ghn/get_time_and_fee",
    data
  );
};

export const confirmOrder = async (data: any) => {
  return intances.post(`/orders/${data?.code}/confirm`, null);
};

export const cancelOrder = async (data: any) => {
  return intances.post(`/orders/${data?.code}/cancel`, data);
};

export const approveOrderUser = async (data: any) => {
  return intances.post(`/orders/${data?.code}/approve_return`, null);
};

export const rejectReturnOrderUser = async (data: any) => {
  return intances.post(`/orders/${data?.code}/reject_return`, data);
};

export const refunAutoOrderUser = async (data: any) => {
  return intances.post(`/orders/${data?.code}/refund_auto`, null);
};

export const refundManualOrderUser = async (data: any) => {
  return intances.post(`/orders/${data?.code}/refund_manual`, data);
};

export const refundPartialOrderUser = async (data: any) => {
  return intances.post(`/orders/${data?.code}/reject_return`, data);
};

export const confirmReturnReceivedOrderUser = async (data: any) => {
  return intances.post(`/orders/${data?.code}/reject_return`, null);
};

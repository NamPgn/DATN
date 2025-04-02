/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import intances, { intancesLocal } from "../instances";
import { token_auth } from "../../common/auth/getToken";
const token_ = token_auth();
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

export const paymentOrder = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.post("/checkout", data, { headers });
};

export const paymentReusult = async (queryString: any) => {
  return intancesLocal.get(`/vnpay-return?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token_}`,
    },
  });
};

export const getAdreeUser = async () => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.get(`/addresses`, { headers });
};

export const getAdreesDefault = async () => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.get(`/addresses/default`, { headers });
};

export const addAddress = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.post(`/addresses`, data, { headers });
};

export const getAddressList = async () => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.get(`/addresses`, { headers });
};

export const setAddressDefault = async (id: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.put(`/addresses/${id}/set-default`, null, { headers });
};

export const deleteAddress = async (id: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.delete(`/addresses/${id}`, { headers });
};

export const updateAddress = async (data: any) => {
  const token_ = token_auth();

  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.put(`/addresses/${data?.id}`, data, { headers });
};

export const getOrderUser = async (currentPage: number | string) => {
  const token_ = token_auth();
  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.get(`/orders_for_user?page=${currentPage}`, { headers });
};

export const getOrderCodeUser = async (code: any) => {
  const token_ = token_auth();
  const headers: any = {};
  const tokenOtp: any = localStorage.getItem("tokenOtp");
  const tkOtp = JSON.parse(tokenOtp);
  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  if (tkOtp) {
    headers["X-Order-Access-Token"] = ` ${tkOtp}`;
  }
  return intancesLocal.get(`/order_detail/${code !== null ? code : ""}`, {
    headers,
  });
};

export const getOrderStatusUser = async () => {
  const token_ = token_auth();
  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.get(`/order_statuses`, { headers });
};

export const getOrderPaymentUser = async (currentPage: any, query: any) => {
  const token_ = token_auth();
  const headers: any = {};

  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  return intancesLocal.get(
    `/orders_for_user?page=${currentPage}&status=${
      query !== null ? query : ""
    }`,
    { headers }
  );
};

export const cancleOrderUser = async (data: any) => {
  const token_ = token_auth();
  const headers: any = {};
  const tokenOtp: any = localStorage.getItem("tokenOtp");
  const tkOtp = JSON.parse(tokenOtp);
  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  if (tkOtp) {
    headers["X-Order-Access-Token"] = ` ${tkOtp}`;
  }
  return intancesLocal.post(`/cancel_order/${data?.code}`, data, { headers });
};

export const refundOrderUser = async (data: any) => {
  const token_ = token_auth();
  const headers: any = {};
  const tokenOtp: any = localStorage.getItem("tokenOtp");
  const tkOtp = JSON.parse(tokenOtp);
  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  if (tkOtp) {
    headers["X-Order-Access-Token"] = ` ${tkOtp}`;
  }
  return intancesLocal.post(`/cancel_order/${data?.code}`, data, { headers });
};

export const payOrderUser = async (data: any) => {
  const token_ = token_auth();
  const headers: any = {};
  const tokenOtp: any = localStorage.getItem("tokenOtp");
  const tkOtp = JSON.parse(tokenOtp);
  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  if (tkOtp) {
    headers["X-Order-Access-Token"] = ` ${tkOtp}`;
  }
  return intancesLocal.post(`/retry_payment_order/${data?.code}`, null, {
    headers,
  });
};

export const closeOrderUser = async (data: any) => {
  const token_ = token_auth();
  const headers: any = {};
  const tokenOtp: any = localStorage.getItem("tokenOtp");
  const tkOtp = JSON.parse(tokenOtp);
  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  if (tkOtp) {
    headers["X-Order-Access-Token"] = ` ${tkOtp}`;
  }
  return intancesLocal.post(`/close_order/${data?.code}`, null, { headers });
};

export const returnOrderUser = async (data: any) => {
  const token_ = token_auth();
  const headers: any = {};
  const tokenOtp: any = localStorage.getItem("tokenOtp");
  const tkOtp = JSON.parse(tokenOtp);
  if (token_) {
    headers.Authorization = `Bearer ${token_}`;
  }
  if (tkOtp) {
    headers["X-Order-Access-Token"] = ` ${tkOtp}`;
  }
  return intancesLocal.post(`/request_refun_order/${data?.code}`, data, {
    headers,
  });
};

export const verifyOrder = async (data: any) => {
  return intancesLocal.post(`/send_verify_order`, data);
};

export const verifyOrderOtp = async (data: any) => {
  return intancesLocal.post(`/verify_order_code`, data);
};

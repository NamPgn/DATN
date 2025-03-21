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
  return intancesLocal.post("/checkout", data);
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

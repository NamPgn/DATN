import axios from "axios";

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

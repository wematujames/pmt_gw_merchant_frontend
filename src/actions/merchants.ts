import axios from "axios";
import setAuthTokenHeader from "./utils/setAuthToken";

export const getPlatformMerchants = async (_filter: any = {}) =>  {
  setAuthTokenHeader()

  const filter = {} as any;

  Object.keys(_filter).forEach((key: any) => {
    if (_filter[key]) filter[key] = _filter[key]
  });

  const res = await axios(
    "/platform/merchants",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: filter
    }
  );

  return res.data.data;
};

export const createMerchant = async (data: object = {}) =>  {
  setAuthTokenHeader()

  const res = await axios(
    "/platform/merchants",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data
    }
  );

  return res.data.data;
};

export const updateMerchantConfig = async (configId: string, config: object = {}) =>  {
  setAuthTokenHeader()

  const res = await axios(
    "/platform/merchantconfigs/" + configId,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: config
    }
  );

  return res.data.data;
};

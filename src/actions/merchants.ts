import setAuthTokenHeader from "./utils/setAuthToken";
import nerasikaAxios from "./utils/nerasikaAxios";

export const getPlatformMerchants = async (_filter: any = {}) =>  {
  setAuthTokenHeader()

  const filter = {} as any;

  Object.keys(_filter).forEach((key: any) => {
    if (_filter[key]) filter[key] = _filter[key]
  });

  const res = await nerasikaAxios(
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

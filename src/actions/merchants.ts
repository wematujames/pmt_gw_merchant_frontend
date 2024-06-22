import setAuthTokenHeader from "./utils/setAuthToken";
import nersikaAxiosConfig from "./utils/nersikaAxiosConfig";

export const getPlatformMerchants = async (_filter: any = {}) =>  {
  setAuthTokenHeader();

  const filter = {} as any;

  Object.keys(_filter).forEach((key: any) => {
    if (_filter[key]) filter[key] = _filter[key]
  });

  const res = await nersikaAxiosConfig(
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

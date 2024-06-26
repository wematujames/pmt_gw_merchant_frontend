import axios from "axios";
import setAuthTokenHeader from "./utils/setAuthToken";

export const getTransactions = async (_filter: any = {}) =>  {
  setAuthTokenHeader()
  
  const filter = {} as any;

  Object.keys(_filter).forEach((key: any) => {
    if (_filter[key]) filter[key] = _filter[key]
  });

  const res = await axios(
    "/platform/transactions",
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

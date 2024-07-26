import axios from "axios";
import setAuthTokenHeader from "./utils/setAuthToken";
export const getDirectDebitMandates = async (_filter: any = {}) =>  {
  setAuthTokenHeader()

  const filter = {} as any;

  Object.keys(_filter).forEach((key: any) => {
    if (_filter[key]) filter[key] = _filter[key]
  });

  const res = await axios(
    "/merchants/directdebit/mandates",
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

export const createDDebitTxn = async (data: any) =>  {
  setAuthTokenHeader()

  const res = await axios(
    "/transactions/web/directdebit/mandates",
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

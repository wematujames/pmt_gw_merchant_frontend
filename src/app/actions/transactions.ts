import axios from "axios";
import setAuthTokenHeader from "./helpers/setAuthToken";

export const getTransactions = async (_filter: any = {}) =>  {
  setAuthTokenHeader();

  console.log("_filter", _filter)

  const filter = {} as any;

  Object.keys(_filter).forEach((key: any) => {
    if (_filter[key]) filter[key] = _filter[key]
  });

  console.log("final filters", filter)

  const res = await axios(
    "http://127.0.0.1:8249/api/v1/platform/transactions",
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

export const loadUser = async () =>  {
    setAuthTokenHeader();
    
    const res = await axios(
      "http://127.0.0.1:8249/api/v1/platform/auth/user",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }
    );

    return res.data.data;
};

export const forgotPassword = async (email: string,) =>  {
   return await axios(
      "http://127.0.0.1:8249/api/v1/platform/auth/forgotpassword",
      {
        method: "POST",
        headers: {  Accept: "application/json","Content-Type": "application/json", },
        data: { email },
      }
    );
};

export const resetPassword = async (resetToken: string, newPassword: string) =>  {
   return await axios(
      "http://127.0.0.1:8249/api/v1/platform/auth/resetpassword",
      {
        method: "POST",
        headers: {  Accept: "application/json","Content-Type": "application/json", },
        data: { resetToken, newPassword },
      }
    );
};


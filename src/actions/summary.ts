import axios from "axios";
import setAuthTokenHeader from "./utils/setAuthToken";

export const getTransactionsOverall = async (_filter: any = {}) =>  {
   setAuthTokenHeader()

  const res = await axios(
    "/merchants/summary/transactionsoverall",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  
  return res.data.data
};

export const getCollectionStatics = async (_filter: any = {}) =>  {
   setAuthTokenHeader()

   const res = await axios(
    "/merchants/summary/collectiontransactionstats",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data
};

export const getDibursementStatics = async (_filter: any = {}) =>  {
   setAuthTokenHeader()

   const res = await axios(
    "/merchants/summary/disbursementtransactionstats",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data
};

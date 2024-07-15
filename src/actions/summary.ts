import setAuthTokenHeader from "./utils/setAuthToken";
import nerasikaAxios from "./utils/nerasikaAxios";

export const getTransactionsOverall = async (_filter: any = {}) =>  {
   setAuthTokenHeader()

  const res = await nerasikaAxios(
    "/platform/summary/transactionsoverall",
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

   const res = await nerasikaAxios(
    "/platform/summary/collectiontransactionstats",
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

   const res = await nerasikaAxios(
    "/platform/summary/disbursementtransactionstats",
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

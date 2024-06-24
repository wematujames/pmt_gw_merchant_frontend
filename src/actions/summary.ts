import axios from "axios";

export const getTransactionsOverall = async (_filter: any = {}) =>  {
   const res = await axios(
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
   const res = await axios(
    "/platform/summary/collectiontransactionstats",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res.data.data)
  return res.data.data
};

export const getDibursementStatics = async (_filter: any = {}) =>  {
   const res = await axios(
    "/platform/summary/disbursementtransactionstats",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res.data.data)
  return res.data.data
};

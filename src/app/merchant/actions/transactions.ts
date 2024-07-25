import axios from "axios";
import setAuthTokenHeader from "./utils/setAuthToken";

export const getTransactions = async (_filter: any = {}) =>  {
  setAuthTokenHeader()
  
  const filter = {} as any;

  Object.keys(_filter.filter).forEach((key: any) => {
    if (_filter.filter[key]) filter[key] = _filter.filter[key]
  });

  const res = await axios(
    "/merchants/transactions",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: Object.assign(_filter.filter, {_page: _filter.pageParam})
    }
  );

  return { data: res.data.data, meta: res.data.meta };
};

export const getTransaction = async (txnId: string) =>  {
  setAuthTokenHeader()
  
  const res = await axios(
    `/merchants/transactions/${txnId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data ;
};

export const reverseTransaction = async (txnId: string, reversalAmount: string) =>  {
  setAuthTokenHeader()
  
  const res = await axios(
    `/transactions/web/payments/reverse`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { transactionId: txnId, reversalAmount }
    }
  );

  return res.data.data;
};

export const createCollectionTxn = async (data: any) =>  {
  setAuthTokenHeader()
  
  const res = await axios(
    `/transactions/web/payments/collection`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    }
  );

  return res.data.data ;
};

export const createDisbursementTxn = async (data: any) =>  {
  setAuthTokenHeader()
  
  const res = await axios(
    `/transactions/web/payments/b2cdisbursement`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data
    }
  );

  return res.data.data ;
};
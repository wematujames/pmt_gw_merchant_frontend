"use client"

import axios from "axios";
import setAuthTokenHeader from "./utils/setAuthToken";

export const login = async (email: string, password: string) =>  {
    const res = await axios(
      "/platform/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { email, password },
      }
    );

    if (res.data.data.token){
      localStorage.setItem("token", res.data.data.token);
    }

    return res.data.data;
};

export const login2fa = async (verificationCode: string, loginToken: string) =>  {

    const res = await axios(
      "/platform/auth/login2fa",
      {
        method: "POST",
        headers: { Accept: "application/json","Content-Type": "application/json" },
        data: { verificationCode, loginToken },
      }
    );

    localStorage.setItem("token", res.data.data.token);

    return res.data.data;
};

export const loadUser = async () =>  {
    setAuthTokenHeader()
    const res = await axios(
      "/platform/auth/user",
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
   return axios(
      "/platform/auth/forgotpassword",
      {
        method: "POST",
        headers: {  Accept: "application/json","Content-Type": "application/json", },
        data: { email },
      }
    );
};

export const resetPassword = async (resetToken: string, newPassword: string) =>  {
   return axios(
      "/platform/auth/resetpassword",
      {
        method: "POST",
        headers: {  Accept: "application/json","Content-Type": "application/json", },
        data: { resetToken, newPassword },
      }
    );
};

export const updateUser = async ( updates: Object) =>  {
  setAuthTokenHeader()

  return axios(
    "/platform/auth/user/updatedetails",
    {
      method: "PUT",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
      data: updates,
    }
  );
};

export const updateUserEmail = async ( updates: Object) =>  {
  setAuthTokenHeader()

  return axios(
    "/platform/auth/user/updateemail",
    {
      method: "PUT",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
      data: updates,
    }
  );
};

export const verifyUserEmail = async ( token: string) =>  {
  setAuthTokenHeader()

  return axios(
    "/platform/auth/user/verifyemail",
    {
      method: "PUT",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
      data: { token },
    }
  );
};

export const resendEmailVeriLink = async ( token: string) =>  {
  setAuthTokenHeader()

  return axios(
    "/platform/auth/user/updateemail",
    {
      method: "PUT",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
      data: {token},
    }
  );
};

export const updateUserMobile = async ( updates: Object) =>  {
  setAuthTokenHeader()

  return axios(
    "/platform/auth/user/updatemobile",
    {
      method: "PUT",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
      data: updates,
    }
  );
};

export const updatePassword = async ( currentPassword: string, newPassword: string, confirmNewPassword: string) =>  {
  setAuthTokenHeader()
  return axios(
    "/platform/auth/user/updatepassword",
    {
      method: "PUT",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
      data: {currentPassword, newPassword, confirmNewPassword},
    }
  );
};

export const getQrCode = async () =>  {
  setAuthTokenHeader()
  const qrCode = await axios(
    "/platform/auth/genqrcode",
    {
      method: "GET",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
    }
  );

  return qrCode.data.data?.qrImage;
};

export const enable2Fa = async ( verficationCode: string) =>  {
  setAuthTokenHeader()
  return axios(
    "/platform/auth/enablemultifa",
    {
      method: "POST",
      headers: {  Accept: "application/json","Content-Type": "application/json", },
      data: { verficationCode },
    }
  );
};


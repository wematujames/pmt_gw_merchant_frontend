import axios from "axios";

export const login = async (email: string, password: string) =>  {
    const res = await axios(
      "http://127.0.0.1:8249/api/v1/platform/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { email, password },
      }
    );

    if (res.status === 200) localStorage.setItem("token", res.data.data.token);

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


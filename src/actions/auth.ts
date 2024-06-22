import setAuthTokenHeader from "./utils/setAuthToken";
import nersikaAxiosConfig from "./utils/nersikaAxiosConfig";

export const login = async (email: string, password: string) =>  {
    const res = await nersikaAxiosConfig(
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

    if (res.status === 200) {
      localStorage.setItem("token", res.data.data.token);
    };

    return res.data.data;
};

export const loadUser = async () =>  {
    setAuthTokenHeader();
    
    const res = await nersikaAxiosConfig(
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
   return nersikaAxiosConfig(
      "/platform/auth/forgotpassword",
      {
        method: "POST",
        headers: {  Accept: "application/json","Content-Type": "application/json", },
        data: { email },
      }
    );
};

export const resetPassword = async (resetToken: string, newPassword: string) =>  {
   return nersikaAxiosConfig(
      "/platform/auth/resetpassword",
      {
        method: "POST",
        headers: {  Accept: "application/json","Content-Type": "application/json", },
        data: { resetToken, newPassword },
      }
    );
};


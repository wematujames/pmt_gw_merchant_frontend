"use client";

import { enable2Fa, getQrCode, loadUser } from "@/actions/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

function TwoFactorAuth() {
  const onFinish = (vals: any) => {};

  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  const generateQrCode = useQuery({
    queryKey: ["current-user-2fa-qrcode"],
    queryFn: () => getQrCode(),
  });

  const enableUser2Fa = useMutation({
    mutationKey: ["enable-2fa-current-user"],
    mutationFn: (data: any) => enable2Fa(data.verificationCode),
  });

  return <></>;
}

export default TwoFactorAuth;

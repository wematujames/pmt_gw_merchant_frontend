"use client";

import { useRouter } from "next/navigation";
import { Flex, Divider, Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "antd";
import styles from "./styles.module.css";
import { useEffect } from "react";
import MerchantLogin from "./MerchantLogin";
import MerchantSetAuthTokenHeader from "@/actions/utils/setAuthToken";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      MerchantSetAuthTokenHeader();
      router.push("/dashboard/financial");
    }
  });

  return (
    <Flex
      className={styles.authLogin}
      justify="center"
      content="right"
      vertical
    >
      <Flex style={{ width: "100%" }} justify="center" align="center" vertical>
        <Link href="/">
          <Image
            src="/nerasollogo.png"
            alt="neraol-logo"
            width={180}
            height={80}
          />
        </Link>
      </Flex>
      <Flex style={{ width: "100%" }} justify="center" align="center" vertical>
        <Card className={styles.loginForm}>
          <Flex
            style={{ width: "100%" }}
            justify="center"
            align="center"
            vertical
          >
            <Typography.Title level={4}>
              Sign In To Your Account
            </Typography.Title>
            <Divider style={{ marginTop: 5, marginBottom: 30 }} />
          </Flex>
          <MerchantLogin />
        </Card>
      </Flex>
    </Flex>
  );
}

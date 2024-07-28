"use client";

import { useRouter } from "next/navigation";
import { Flex, Divider, Card, Tabs } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "antd";
import styles from "./styles.module.css";
import { useEffect } from "react";
import MerchantLogin from "../../merchant/(no-auth)/auth/login/MerchantLogin";
import NerasolLogin from "../../nerasol/(no-auth)/auth/login/AdminLogin";
import MerchantSetAuthTokenHeader from "@/app/merchant/actions/utils/setAuthToken";
import NerasolSetAuthTokenHeader from "@/app/nerasol/actions/utils/setAuthToken";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("admin-token")) {
      router.push("/nerasol/dashboard/financial");
      NerasolSetAuthTokenHeader();
    }

    if (localStorage.getItem("merchant-token")) {
      MerchantSetAuthTokenHeader();
      router.push("/merchant/dashboard/financial");
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
            <Divider style={{ margin: 0 }} />
          </Flex>
          <Tabs
            defaultActiveKey="merchant"
            centered
            items={[
              {
                label: `Merchant`,
                key: "merchant",
                children: <MerchantLogin />,
              },
              {
                label: `Nerasol`,
                key: "nerasol",
                children: <NerasolLogin />,
              },
            ]}
          />
        </Card>
      </Flex>
    </Flex>
  );
}

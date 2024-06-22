"use client";

import React, { useState } from "react";
import { Divider, Flex, Layout, theme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserAvatar from "./user/components/Avatar";
import Link from "next/link";
import Image from "next/image";
import AppSideMenu from "./AppSideMenu";
const { Header, Content, Footer, Sider } = Layout;
const queryClient = new QueryClient();

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollaped] = useState(false);

  const { token } = theme.useToken();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout hasSider>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {}}
          onCollapse={(collapsed, type) => {}}
          style={{ minHeight: "100vh" }}
        >
          <Flex style={{ width: "100%" }} justify="center" align="center">
            <Link href="/">
              <Image
                src="/nerasollogo.png"
                alt="nerasol-logo"
                width={180}
                height={80}
              />
            </Link>
          </Flex>
          <Divider style={{ background: "#e1e1ef", margin: 0 }} />
          <AppSideMenu />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: token.colorBgContainer,
              paddingRight: token.paddingMD,
              textAlign: "right",
            }}
          >
            <UserAvatar />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Nerasika ©{new Date().getFullYear()} Created by NeraSol Ghana
            Limited
          </Footer>
        </Layout>
      </Layout>
    </QueryClientProvider>
  );
}

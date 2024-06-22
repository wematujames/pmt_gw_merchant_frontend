"use client";
import "./layout.module.css";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Divider, Flex, Layout, theme } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserAvatar from "./user/components/Avatar";
import Link from "next/link";
import Image from "next/image";
import AppSideMenu from "./AppSideMenu";
const { Header, Content, Footer, Sider } = Layout;
const queryClient = new QueryClient();
const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

export default function ProtectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollaped] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG, paddingMD },
  } = theme.useToken();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout hasSider>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={
            collapsed
              ? {
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                }
              : {}
          }
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
        <Layout style={collapsed ? { marginLeft: 200 } : {}}>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              paddingRight: paddingMD,
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

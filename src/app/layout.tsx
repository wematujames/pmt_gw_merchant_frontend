"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { montserrat } from "@/fonts/fonts";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "@/context/NotificationContext";
import MessageProvider from "@/context/MessageContext";
import { ConfigProvider } from "antd";
import theme from "@/themes/default";
import axios from "axios";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  // configure base url
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <html lang="en" content="noindex, nofollow">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nerasika</title>
      </head>
      <body className={montserrat.className}>
        <NotificationProvider>
          <MessageProvider>
            <QueryClientProvider client={queryClient}>
              <ConfigProvider theme={theme}>
                <AntdRegistry>{children}</AntdRegistry>
              </ConfigProvider>
            </QueryClientProvider>
          </MessageProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}

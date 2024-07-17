"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationProvider from "@/context/NotificationContext";
import MessageProvider from "@/context/MessageContext";
import setAuthTokenHeader from "@/actions/utils/setAuthToken";
const inter = Inter({ subsets: ["latin"] });

setAuthTokenHeader();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
      },
    },
  });

  return (
    <html lang="en" content="noindex, nofollow">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Nerasika</title>
      </head>
      <body className={inter.className}>
        <NotificationProvider>
          <MessageProvider>
            <QueryClientProvider client={queryClient}>
              <AntdRegistry>{children}</AntdRegistry>
            </QueryClientProvider>
          </MessageProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}

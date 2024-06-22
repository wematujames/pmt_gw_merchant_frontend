"use client";
import React, { useState } from "react";
import { Card, Space, theme } from "antd";
import Meta from "antd/es/card/Meta";
import { AiOutlineTransaction } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { Tabs } from "antd";
import { GrOverview } from "react-icons/gr";
import OverView from "../components/OverView";
import TransactionReport from "../components/TransactionReport";
import { TbReport } from "react-icons/tb";

const App: React.FC = () => {
  const { token } = theme.useToken();
  const searchParams = useSearchParams();
  const [activeTabKey, setActiveTabKey] = useState<string>(
    searchParams.get("tab") ? (searchParams.get("tab") as string) : "report"
  );

  const tabs = [
    {
      key: "overview",
      label: "Overview",
      children: <OverView />,
      icon: <GrOverview />,
    },
    {
      key: "report",
      label: "Report",
      children: <TransactionReport />,
      icon: <TbReport />,
    },
  ];

  const onTabChange = (key: string) => setActiveTabKey(key);

  return (
    <Card
      style={{ width: "100", minHeight: "80vh" }}
      tabProps={{ size: "large", centered: true }}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      <Meta
        title={
          <Space
            style={{
              fontSize: token.fontSizeHeading4,
              marginTop: -token.marginXXS,
            }}
          >
            <AiOutlineTransaction />
            <p>Transactions</p>
          </Space>
        }
        description={
          <p
            style={{
              fontSize: token.fontSizeSM,
              marginBottom: token.marginXS,
              marginTop: -token.marginXS,
            }}
          >
            View all transaction and extract reports
          </p>
        }
        style={{ marginTop: token.marginSM }}
      />
      <Tabs
        size="large"
        style={{ minHeight: "80vh" }}
        activeKey={activeTabKey}
        onTabClick={(key) => setActiveTabKey(key)}
        centered
        items={tabs}
      />
    </Card>
  );
};

export default App;

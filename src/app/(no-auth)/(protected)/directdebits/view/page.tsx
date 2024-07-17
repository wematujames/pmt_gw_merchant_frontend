"use client";
import React, { Suspense, useState } from "react";
import { Card, Space, theme } from "antd";
import Meta from "antd/es/card/Meta";
import { useSearchParams } from "next/navigation";
import { Tabs } from "antd";
import { GrOverview } from "react-icons/gr";
import OverView from "../components/OverView";
import TransactionReport from "../components/DDebitMandatesReport";
import { TbReport } from "react-icons/tb";
import { useAuth } from "../../../../../hooks/useAuth";
import { CiMoneyCheck1 } from "react-icons/ci";
import PageLoader from "../../PageLoader";

const DirectDebitMandates: React.FC = () => {
  const authenticated = useAuth();

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

  if (!authenticated) return <PageLoader />;

  return (
    <Card
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
            <CiMoneyCheck1 />
            <p>Direct Debit Mandates</p>
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
            View and manage direct debit mandates
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

export default function DirectDebitMandatesSuspended() {
  return (
    <Suspense>
      <DirectDebitMandates />
    </Suspense>
  );
}

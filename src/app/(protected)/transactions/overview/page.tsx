import React from "react";
import { Card, Tabs } from "antd";
import { IoAnalytics } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";

const tabs = [
  {
    key: "overview",
    label: `Overview`,
    children: <div>Overview</div>,
    icon: <IoAnalytics />,
  },
  {
    key: "transactions",
    label: `Transactions`,
    children: <div>Transactions</div>,
    icon: <BiMoneyWithdraw />,
  },
];

const Transactions: React.FC = () => {
  return (
    <Card>
      <Tabs
        style={{ height: "80vh" }}
        defaultActiveKey="2"
        centered
        items={tabs}
      />
    </Card>
  );
};

export default Transactions;

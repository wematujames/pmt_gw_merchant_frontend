"use client";
import { useState } from "react";
import { Menu, theme } from "antd";
import Link from "next/link";
import { ImMeter } from "react-icons/im";

import type { MenuProps } from "antd";
import { TbTransactionBitcoin, TbTransactionDollar } from "react-icons/tb";

const { SubMenu } = Menu;

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <ImMeter />,
    items: [{ key: "2", label: "Financial", link: "/dashboard/financial" }],
  },
  {
    key: "transaction_report",
    label: "Transactions",
    icon: <TbTransactionDollar />,
    items: [
      {
        key: "6",
        label: `Overview`,
        link: "/transactions/view?tab=overview",
      },
      {
        key: "5",
        label: `Report`,
        link: "/transactions/view?tab=report",
      },
    ],
  },
  {
    key: "direcctdebits",
    label: "Direct Debits",
    icon: <TbTransactionBitcoin />,
    items: [
      {
        key: "7",
        label: `Overview`,
        link: "/directdebits/view?tab=overview",
      },
      {
        key: "8",
        label: `Report`,
        link: "/directdebits/view?tab=report",
      },
    ],
  },
];

function renderMenuItems(items: any) {
  return items.map((item: any) => {
    if (item.items) {
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.label}>
          {renderMenuItems(item.items)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key}>
        <Link href={item.link}>{item.label}</Link>
      </Menu.Item>
    );
  });
}

const AppSideMenu: React.FC = () => {
  const [current, setCurrent] = useState("1");
  const {} = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => setCurrent(e.key);

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      style={{ width: 200 }}
      defaultOpenKeys={["dashboard"]}
      selectedKeys={[current]}
      mode="inline"
    >
      {renderMenuItems(items)}
    </Menu>
  );
};

export default AppSideMenu;

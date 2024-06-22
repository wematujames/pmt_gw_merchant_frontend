"use client";
import { useState } from "react";
import { Menu, theme } from "antd";
import Link from "next/link";
import { ImMeter } from "react-icons/im";

import type { MenuProps } from "antd";
import { GrTransaction } from "react-icons/gr";
import { BsShop } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

const { SubMenu } = Menu;

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <ImMeter />,
    items: [
      // { key: "1", label: "Operational", link: "/dashboard/operational" },
      { key: "2", label: "Financial", link: "/dashboard/financial" },
    ],
  },
  {
    key: "transactions",
    label: "Transactions",
    icon: <GrTransaction />,
    items: [
      { key: "6", label: `Overview`, link: "/transactions/view?tab=overview" },
      { key: "5", label: `Report`, link: "/transactions/view?tab=report" },
      // { key: "9", label: `USSD Reports`, link: "/ussd/reports" },
    ],
  },
  {
    key: "merchants",
    label: "Merchants",
    icon: <BsShop />,
    items: [
      { key: "10", label: `Manage Merchant`, link: "/merchants/view" },
      // { key: "11", label: `USSD API Docs`, link: "/docs/sms/v1" },
      // { key: "12", label: `OTP API Docs`, link: "/docs/otp/v1" },
    ],
  },
  {
    key: "users",
    label: "Platform Users",
    icon: <HiUserGroup />,
    items: [
      { key: "13", label: `Manage Users`, link: "/users/view" },
      // { key: "14", label: `USSD API Docs`, link: "/docs/sms/v1" },
      // { key: "15", label: `OTP API Docs`, link: "/docs/otp/v1" },
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

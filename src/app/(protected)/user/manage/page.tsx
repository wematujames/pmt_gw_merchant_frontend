"use client";
import { useSearchParams } from "next/navigation";
import { Card, Tabs } from "antd";
import { CgPassword } from "react-icons/cg";
import { BsLockFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";

import UpdateProfile from "./components/UpdateProfile";
import TwoFactorAuth from "./components/TwoFactorAuth";
import UpdatePassword from "./components/UpdatePassword";
import { useState } from "react";

const tabs = [
  {
    key: "profile",
    label: `Profile`,
    children: <UpdateProfile />,
    icon: <BiUserCircle />,
  },
  {
    key: "2fa",
    label: `2-Factor Authentication`,
    children: <TwoFactorAuth />,
    icon: <BsLockFill />,
  },
  {
    key: "password",
    label: `Password`,
    children: <UpdatePassword />,
    icon: <CgPassword />,
  },
];

const User: React.FC = () => {
  const searchParams = useSearchParams();

  const [activeKey, setActiveKey] = useState(
    searchParams.get("tab") ? (searchParams.get("tab") as string) : "profile"
  );

  return (
    <Card>
      <Tabs
        size="large"
        style={{ height: "80vh" }}
        activeKey={activeKey}
        onTabClick={(key) => setActiveKey(key)}
        centered
        items={tabs}
      />
    </Card>
  );
};

export default User;
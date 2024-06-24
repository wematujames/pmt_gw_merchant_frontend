import { LockOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, Dropdown, Space, Spin, theme } from "antd";
import { useLogout } from "../../../../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { loadUser } from "@/actions/auth";
import Meta from "antd/es/card/Meta";
import React from "react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

const { useToken } = theme;
const UserAvatar = () => {
  const { token } = useToken();
  const logout = useLogout();

  const items = [
    {
      key: "1",
      icon: <CgProfile />,
      label: <Link href="/user/manage?tab=profile">View Profile</Link>,
    },
    {
      key: "2",
      icon: <LockOutlined />,
      label: <Link href="/user/manage?tab=password">Update Password</Link>,
    },
    {
      key: "3",
      icon: <LockOutlined />,
      label: <Link href="/user/manage?tab=2fa">2 FA</Link>,
    },
    {
      key: "4",
      danger: true,
      icon: <LogoutOutlined />,
      label: <a onClick={logout}>Logout</a>,
    },
  ];

  const userQuery = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  if (userQuery.isPending) return <Spin size="small" />;

  const menuStyle = {
    boxShadow: "none",
    marginLeft: 0,
    padding: 0,
  };

  if (userQuery.isError) {
    logout();
  }

  return (
    <Dropdown
      menu={{ items }}
      dropdownRender={(menu: any) => (
        <Card
          style={{ width: 300, marginTop: 16 }}
          loading={userQuery.isLoading}
        >
          <Meta
            avatar={
              <Avatar
                shape="square"
                style={{ backgroundColor: "#001550" }}
                size={50}
              >
                {userQuery.data.person.lName.slice(0, 1)}
                {userQuery.data.person.fName.slice(0, 1)}
              </Avatar>
            }
            title={`${userQuery.data.person.fName} ${userQuery.data.person.lName}`}
            description={userQuery.data.email}
          />
          <Divider style={{ margin: 5 }} />
          {React.cloneElement(menu, { style: menuStyle })}
        </Card>
      )}
    >
      <Space>
        <Avatar
          shape="square"
          style={{ backgroundColor: "#001550" }}
          size={{ lg: 45, xl: 50 }}
        >
          {userQuery.data.person.lName.slice(0, 1)}
          {userQuery.data.person.fName.slice(0, 1)}
        </Avatar>
      </Space>
    </Dropdown>
  );
};

export default UserAvatar;

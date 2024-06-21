import { UserOutlined, LockOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, Dropdown, Space, theme } from "antd";
import { useLogout } from "../../../../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { loadUser } from "@/app/actions/auth";
import Meta from "antd/es/card/Meta";
import React from "react";

const { useToken } = theme;
const UserAvatar = () => {
  const { token } = useToken();
  const logout = useLogout();

  const items = [
    {
      key: "1",
      icon: <LockOutlined />,
      label: <a target="_blank">Update Password</a>,
    },
    {
      key: "2",
      danger: true,
      icon: <LogoutOutlined />,
      label: <a onClick={logout}>Logout</a>,
    },
  ];

  const userQuery = useQuery({
    queryKey: ["load-user"],
    queryFn: () => loadUser(),
  });

  if (userQuery.isPending)
    return (
      <Avatar
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80 }}
        icon={<UserOutlined />}
      />
    );

  if (userQuery.isSuccess) {
    console.log("user", userQuery.data);
  }

  const menuStyle = {
    boxShadow: "none",
    margin: 0,
    padding: 0,
  };

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <Dropdown
      menu={{ items }}
      dropdownRender={(menu: any) => (
        <Card
          style={{
            width: 300,
            marginTop: 16,
          }}
          loading={userQuery.isLoading}
        >
          <Meta
            avatar={<Avatar size={50} icon={<UserOutlined />} />}
            title={`${userQuery.data.person.fName} ${userQuery.data.person.lName}`}
            description={userQuery.data.email}
          />
          <Divider style={{ margin: 5 }} />
          {React.cloneElement(menu, { style: menuStyle })}
        </Card>
      )}
    >
      <Space>
        {userQuery.data.person.fName}
        {userQuery.data.person.lName}
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80 }}
          icon={<UserOutlined />}
        />
      </Space>
    </Dropdown>
  );
};

export default UserAvatar;

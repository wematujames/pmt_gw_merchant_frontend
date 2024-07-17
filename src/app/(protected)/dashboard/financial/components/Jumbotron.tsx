"use client";
import { loadUser } from "@/actions/auth";
import { useQuery } from "@tanstack/react-query";
import { Card, theme } from "antd";

const Jumbotron = () => {
  const { token } = theme.useToken();

  const userQuery = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) return "Good morning,";
    else if (hour < 18) return "Good afternoon,";
    else return "Good evening,";
  }

  return (
    <Card
      bordered
      style={{ marginTop: token.marginXXS, marginBottom: token.marginSM }}
    >
      <p style={{ fontSize: token.fontSizeHeading2 }}>
        {getGreeting()} {userQuery.data?.person?.fName}
      </p>
      <p style={{ fontSize: token.fontSize, color: token.colorBgMask }}>
        {"Here's"} your financial overview
      </p>
    </Card>
  );
};

export default Jumbotron;

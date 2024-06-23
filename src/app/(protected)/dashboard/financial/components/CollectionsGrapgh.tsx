"use client";
import { Card, Space, theme } from "antd";
import { Line } from "@ant-design/plots";
import Meta from "antd/es/card/Meta";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import NetworkStats from "./NetworkTnxStats";

function CollectionsGrapgh() {
  const { token } = theme.useToken();

  const colNetworkData = [
    {
      network: "MTN MoMo",
      today: 234.23,
      allTime: 3242342.23,
      logo: "/mtnghlogo.jpg",
    },
    {
      network: "T-Cash",
      today: 24.23,
      allTime: 3242.23,
      logo: "/tcashlogo.jpg",
    },
    {
      network: "MTN MoMo2",
      today: 234.23,
      allTime: 3242342.23,
      logo: "/mtnghlogo.jpg",
    },
    {
      network: "T-Cash2",
      today: 24.23,
      allTime: 3242.23,
      logo: "/tcashlogo.jpg",
    },
  ];

  const data = [
    { day: "1991", total: 3 },
    { day: "1992", total: 4 },
    { day: "1993", total: 3.5 },
    { day: "1994", total: 5 },
    { day: "1995", total: 4.9 },
    { day: "1996", total: 6 },
    { day: "1997", total: 7 },
  ];

  const config = {
    data,
    height: 250,
    xField: "day",
    yField: "total",
    style: { lineWidth: 2 },
    interaction: { tooltip: { marker: false } },
    point: { shapeField: "circle", sizeField: 3 },
  };

  return (
    <>
      <Card
        title={
          <Meta
            title={
              <p
                style={{
                  fontSize: token.fontSizeHeading4,
                  marginTop: -token.marginXXS,
                }}
              >
                <Space>
                  <FaMoneyBillTrendUp />
                  <p>Collections Overview</p>
                </Space>
              </p>
            }
            description={
              <p
                style={{
                  fontSize: token.fontSizeSM,
                  marginBottom: token.marginXS,
                  marginTop: -token.marginXS,
                }}
              >
                Based on data from the past 7 days
              </p>
            }
            style={{ marginTop: token.marginSM }}
          />
        }
        style={{ marginTop: token.marginMD }}
      >
        <NetworkStats stats={colNetworkData} />
        <Line {...config} />
      </Card>
    </>
  );
}

export default CollectionsGrapgh;

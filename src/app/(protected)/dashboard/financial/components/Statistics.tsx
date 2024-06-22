"use client";
import { Card, Row, Col, Statistic, theme } from "antd";
import CountUp from "react-countup";
import type { StatisticProps } from "antd";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

const StatisticsCards = () => {
  const { token } = theme.useToken();

  const stats = [
    {
      title: "Total Collections",
      value: 1128,
      prefix: "",
    },
    {
      title: "Total Revenue",
      value: 93842,
      prefix: "$",
    },
    {
      title: "Total Disbursements",
      value: 48393,
      prefix: "$",
    },
    {
      title: "Active Merchants",
      value: 238,
      prefix: "",
    },
  ];

  return (
    <Row gutter={16}>
      {stats.map((stat: StatisticProps) => (
        <Col key={stat.title as string} span={6}>
          <Card>
            <Statistic
              formatter={formatter}
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatisticsCards;

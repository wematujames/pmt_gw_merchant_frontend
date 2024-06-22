"use client";
import { Card, Statistic, theme, Row, Col } from "antd";
import CountUp from "react-countup";
import type { StatisticProps } from "antd";
import { StatCardItem } from "@/types/types";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

const StatisticsCards = ({ stats }: { stats: StatCardItem[] }) => {
  const { token } = theme.useToken();

  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat: StatCardItem) => (
        <Col key={stat.title as string} xs={24} sm={12} md={8} lg={6}>
          <Card key={stat.title as string}>
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

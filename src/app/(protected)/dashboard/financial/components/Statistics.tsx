"use client";
import { Card, Statistic, theme, Row, Col } from "antd";
import CountUp from "react-countup";
import type { StatisticProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsOverall } from "@/actions/summary";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

const StatisticsCards = () => {
  const { token } = theme.useToken();

  const txnOverall = useQuery({
    queryKey: ["txns-overall"],
    queryFn: () => getTransactionsOverall(),
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            loading={txnOverall.isLoading}
            formatter={formatter}
            title="Collections Today"
            value={txnOverall.data?.colTodayAmt}
            prefix="₵"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            loading={txnOverall.isLoading}
            formatter={formatter}
            title="Total Collections"
            value={txnOverall.data?.colTotalAmt}
            prefix="₵"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            loading={txnOverall.isLoading}
            formatter={formatter}
            title="Disbursements Today"
            value={txnOverall.data?.disTodayAmt}
            prefix="₵"
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Statistic
            loading={txnOverall.isLoading}
            formatter={formatter}
            title="Total Disbursements"
            value={txnOverall.data?.disTotalAmt}
            prefix="₵"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticsCards;

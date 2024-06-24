"use client";
import { Line } from "@ant-design/plots";
import { Card, theme } from "antd";
import { BiMoneyWithdraw } from "react-icons/bi";
import NetworkStats from "./NetworkTnxStats";
import SectionHeader from "../../../components/SectionHeader";
import { getDibursementStatics } from "@/actions/summary";
import { useQuery } from "@tanstack/react-query";

export default function DisbursementsGrapgh() {
  const { token } = theme.useToken();

  const disbursementStats = useQuery({
    queryKey: ["disbursements-overview"],
    queryFn: () => getDibursementStatics(),
  });

  const graphData = disbursementStats.data?.graph || [];
  const networks = disbursementStats.data?.networks || [];

  return (
    <Card style={{ marginTop: token.marginMD }}>
      <SectionHeader
        leadText="Disbursements Overview"
        subText="Based on data from the past 7 days"
        icon={<BiMoneyWithdraw />}
      />

      <NetworkStats stats={networks} loading={disbursementStats.isLoading} />

      <Line
        data={graphData}
        height={250}
        xField="day"
        yField="total"
        style={{ lineWidth: 2 }}
        interaction={{ tooltip: { marker: false } }}
        point={{ shapeField: "circle", sizeField: 4 }}
      />
    </Card>
  );
}

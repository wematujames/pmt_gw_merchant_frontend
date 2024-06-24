"use client";
import { Line } from "@ant-design/plots";
import { Card, theme } from "antd";
import { BiMoneyWithdraw } from "react-icons/bi";
import NetworkStats from "./NetworkTnxStats";
import SectionHeader from "./SectionHeader";
import { getDibursementStatics } from "@/actions/summary";
import { useQuery } from "@tanstack/react-query";
function DisbursementsGrapgh() {
  const { token } = theme.useToken();

  const disbursementStats = useQuery({
    queryKey: ["disbursements-overview"],
    queryFn: () => getDibursementStatics(),
  });

  return (
    <Card style={{ marginTop: token.marginMD }}>
      <SectionHeader
        leadText="Disbursements Overview"
        subText="Based on data from the past 7 days"
        icon={<BiMoneyWithdraw />}
      />

      <NetworkStats
        stats={disbursementStats.data?.networks}
        loading={disbursementStats.isLoading}
      />

      <Line
        data={disbursementStats.data?.graph}
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

export default DisbursementsGrapgh;

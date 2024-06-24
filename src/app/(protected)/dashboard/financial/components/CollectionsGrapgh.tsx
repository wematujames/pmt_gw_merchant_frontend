"use client";
import { Card, theme } from "antd";
import { Line } from "@ant-design/plots";
import NetworkStats from "./NetworkTnxStats";
import { useQuery } from "@tanstack/react-query";
import { getCollectionStatics } from "@/actions/summary";
import SectionHeader from "../../../components/SectionHeader";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export default function CollectionsGrapgh() {
  const { token } = theme.useToken();

  const collectionStats = useQuery({
    queryKey: ["collections-overview"],
    queryFn: () => getCollectionStatics(),
  });

  const graphData = collectionStats.data?.graph || [];
  const networks = collectionStats.data?.networks || [];
  return (
    <Card style={{ marginTop: token.marginMD }}>
      <SectionHeader
        leadText="Collections Overview"
        subText="Based on data from the past 7 days"
        icon={<FaMoneyBillTrendUp />}
      />

      <NetworkStats stats={networks} loading={collectionStats.isLoading} />

      <Line
        data={graphData}
        height={250}
        xField="day"
        yField="total"
        style={{ lineWidth: 2 }}
        interaction={{ tooltip: { marker: false } }}
        point={{ shapeField: "circle", sizeField: 3 }}
      />
    </Card>
  );
}

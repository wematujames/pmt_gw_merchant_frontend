"use client";
import { Card, theme } from "antd";
import { Line } from "@ant-design/plots";
import NetworkStats from "./NetworkTnxStats";
import { useQuery } from "@tanstack/react-query";
import { getCollectionStatics } from "@/actions/summary";
import SectionHeader from "./SectionHeader";

function CollectionsGrapgh() {
  const { token } = theme.useToken();

  const collectionStats = useQuery({
    queryKey: ["collections-overview"],
    queryFn: () => getCollectionStatics(),
  });

  console.log(collectionStats.isPending);
  return (
    <Card style={{ marginTop: token.marginMD }}>
      <SectionHeader />
      <NetworkStats
        stats={collectionStats.data?.networks}
        loading={collectionStats.isLoading}
      />
      <Line
        data={collectionStats.data?.graph}
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

export default CollectionsGrapgh;

import { useState } from "react";
import { Avatar, Card, Col, Row, theme } from "antd";
import { NetworkCollectionStat } from "@/types/types";

const { Meta } = Card;

function NetworkStats({ stats }: { stats: NetworkCollectionStat[] }) {
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  return (
    <Row justify="space-between">
      {stats.map((netrk: NetworkCollectionStat, idx) => (
        <Col key={netrk.network as string} xs={24} sm={12} md={8} lg={6}>
          <Card
            key={netrk.network}
            style={{
              marginTop: token.marginMD,
              marginBottom: token.marginMD,
            }}
            bordered={false}
            loading={loading}
          >
            <Meta
              avatar={<Avatar src={netrk.logo} size={64} />}
              title={netrk.network}
              description={
                <>
                  <small>
                    Today: {parseFloat("" + netrk.today).toFixed(2)}
                  </small>
                  <br />
                  <small>
                    Balance: GHS {parseFloat("" + netrk.allTime).toFixed(2)}
                  </small>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default NetworkStats;

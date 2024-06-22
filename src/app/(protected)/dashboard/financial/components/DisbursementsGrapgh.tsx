import { Line } from "@ant-design/plots";
import { Card, Space, theme } from "antd";
import Meta from "antd/es/card/Meta";
import { BiMoneyWithdraw } from "react-icons/bi";
function DisbursementsGrapgh() {
  const { token } = theme.useToken();

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
    point: { shapeField: "circle", sizeField: 4 },
  };

  return (
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
                <BiMoneyWithdraw />
                <p>Disbursements Overview</p>
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
      <Line {...config} />
    </Card>
  );
}

export default DisbursementsGrapgh;

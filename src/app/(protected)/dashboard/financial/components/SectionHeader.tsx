"use client";
import { Space, theme } from "antd";
import Meta from "antd/es/card/Meta";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

function SectionHeader() {
  const { token } = theme.useToken();

  return (
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
  );
}

export default SectionHeader;

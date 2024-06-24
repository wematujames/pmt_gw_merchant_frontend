"use client";
import { Space, theme } from "antd";
import Meta from "antd/es/card/Meta";

function SectionHeader({
  leadText,
  subText,
  icon,
}: {
  leadText: string;
  subText: string;
  icon: JSX.Element;
}) {
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
            {icon}
            <p>{leadText}</p>
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
          {subText}
        </p>
      }
    />
  );
}

export default SectionHeader;

"use client";
import { Flex, Space, theme, Typography } from "antd";
import Meta from "antd/es/card/Meta";

function SectionHeader({
  leadText,
  subText,
  icon,
  extra,
}: {
  leadText: string;
  subText: string;
  icon: JSX.Element;
  extra: any;
}) {
  const { token } = theme.useToken();

  return (
    <Flex justify="space-between">
      <Meta
        title={
          <Space>
            {icon}
            <Typography.Title level={4}>{leadText}</Typography.Title>
          </Space>
        }
        description={
          <Typography.Paragraph
            style={{
              fontSize: token.fontSizeSM,
              marginBottom: token.marginXS,
              marginTop: -token.marginXS,
              color: token.colorTextDescription,
            }}
          >
            {subText}
          </Typography.Paragraph>
        }
      />
      {extra}
    </Flex>
  );
}

export default SectionHeader;

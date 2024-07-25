import { Space, Switch, theme, Typography } from "antd";

function WebTransactions() {
  const { token } = theme.useToken();

  return (
    <Space direction="horizontal" style={{ marginRight: 20 }}>
      <Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
        Web Txns:
      </Typography.Text>
      <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
    </Space>
  );
}

export default WebTransactions;

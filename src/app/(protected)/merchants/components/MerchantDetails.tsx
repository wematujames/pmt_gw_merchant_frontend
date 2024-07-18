import React from "react";
import { Button, Col, Input, Modal, Row, Tag, theme, Typography } from "antd";
import { BsEye } from "react-icons/bs";
import { getRecColor } from "@/utils/common";

export default function TxnDetails({ merchant }: { merchant: any }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { token } = theme.useToken();

  const transformMerchant: any = (merchant: any) => ({
    Name: merchant.name,
    MerchantId: merchant.merchantId,
    Email: merchant.email,
    "Email Verified": merchant.emailVerified ? "Yes" : "No",
    Phone: merchant.phone,
    "Phone Verified": merchant.phoneVerified ? "Yes" : "No",
    CreatedAt: merchant.createdAt,
    CreatedBy: merchant.createdBy?.email,
  });

  const merchantTransformed = transformMerchant(merchant);

  return (
    <>
      <Button
        type="default"
        icon={<BsEye />}
        onClick={() => setOpen(true)}
        size="middle"
        style={{
          color: getRecColor(merchant.active, token),
          borderColor: getRecColor(merchant.active, token),
        }}
      />

      <Modal
        open={open}
        width={1000}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Title level={5}>
            <Tag color={getRecColor(merchant.active, token)}>
              {merchant.active ? "Active" : "Inactive"}
            </Tag>
            {"Merchant: " + merchant._id}
          </Typography.Title>
        }
        footer={false}
      >
        <Row gutter={[10, 5]}>
          {Object.keys(merchantTransformed).map((key) => (
            <Col key={key} lg={12} style={{ width: "100%" }}>
              <Input
                readOnly
                addonBefore={<p>{key}</p>}
                value={merchantTransformed[key]}
              />
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
}

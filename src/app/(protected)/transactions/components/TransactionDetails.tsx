import React from "react";
import { Button, Col, Input, Modal, Row, Space, theme } from "antd";
import { BsEye } from "react-icons/bs";
import { getRecColor } from "@/utils/common";

export default function TxnDetails({ txn }: { txn: any }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { token } = theme.useToken();

  const transformTxn: any = (txn: any) => ({
    Status: txn.status,
    Reason: txn.statusReason,
    Processor: txn.processor,
    "Amount ₵": parseFloat(txn.amount).toFixed(2),
    Reversed: txn.reversed,
    "Original Amount ₵": parseFloat(txn.originalAmount).toFixed(2),
    "Reversal Amount ₵": parseFloat(txn.originalAmount).toFixed(2),
    Account: txn.phone,
    Narration: txn.desc,
    Type: txn.type,
    Network: txn.network,
    Merchant: txn.merchant,
    MerchantRef: txn.merchantRef,
    CallbackURl: txn.merchantCallbackURL,
    ExternalRef: txn.processorTerminalRef || "N/A",
    CreatedAt: txn.createdAt,
  });

  const txnTransformed = transformTxn(txn || {});

  return (
    <>
      <Button
        type="default"
        icon={<BsEye />}
        size="middle"
        style={{
          color: getRecColor(txn.status, token),
          borderColor: getRecColor(txn.status, token),
        }}
        onClick={() => setOpen(true)}
      />

      <Modal
        open={open}
        width={1000}
        onCancel={() => setOpen(false)}
        title={
          <Space style={{ color: getRecColor(txn.status, token) }}>
            Transaction: {txn._id}
          </Space>
        }
        footer={false}
      >
        <Row gutter={[10, 5]}>
          {Object.keys(txnTransformed).map((key) => (
            <Col key={key} lg={12} style={{ width: "100%" }}>
              <Input
                readOnly
                addonBefore={<p>{key}</p>}
                value={txnTransformed[key]}
              />
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
}

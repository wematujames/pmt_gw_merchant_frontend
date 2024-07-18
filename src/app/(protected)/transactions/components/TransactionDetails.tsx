import React from "react";
import { Button, Col, Input, Modal, Row, Space, theme } from "antd";
import { BsEye } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/actions/transactions";

export default function TxnDetails({
  txnId,
  status,
}: {
  txnId: any;
  status: "successful" | "pending" | "failed";
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { token } = theme.useToken();

  const getRecColor = (status: string) => {
    switch (status) {
      case "successful":
        return token["green7"];
      case "pending":
        return token["yellow7"];
      case "failed":
        return token["red7"];
      default:
        return "black";
    }
  };

  const txnQuery = useQuery({
    queryKey: ["txn-detail"],
    queryFn: () => getTransaction(txnId),
  });

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
    ExternalRef: txn.processorTerminalRef,
    CreatedAt: txn.createdAt,
  });

  const txnTransformed = transformTxn(txnQuery.data || {});

  return (
    <>
      <Button
        type="default"
        icon={<BsEye />}
        size="middle"
        style={{
          color: getRecColor(status),
          borderColor: getRecColor(status),
        }}
        onClick={() => setOpen(true)}
      />

      <Modal
        open={open}
        width={1000}
        loading={txnQuery.isFetching}
        onCancel={() => setOpen(false)}
        title={
          <Space style={{ color: getRecColor(status) }}>
            Transaction: {txnId}
          </Space>
        }
        footer={
          <Button block type="default" onClick={() => txnQuery.refetch()}>
            <RxReload />
            Check Status
          </Button>
        }
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

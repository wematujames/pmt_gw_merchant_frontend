import React from "react";
import { Button, Col, Input, Modal, Row } from "antd";
import { BsEye } from "react-icons/bs";
import { RxReload } from "react-icons/rx";

export default function TxnDetails({ transaction }: { transaction: any }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const transformTxn: any = (txn: any) => ({
    Active: txn.active,
    Reason: txn.statusReason,
    "Amount ₵": parseFloat(txn.amount).toFixed(2),
    Account: txn.phone,
    Narration: txn.desc,
    Network: txn.network,
    Merchant: txn.merchant,
    MerchantRef: txn.merchantRef,
    MerchantCreateCallback: txn.merchantCreateDDMCallbackURL,
    MerchantPayCallback: txn.merchantPayDDMCallbackURL,
    MerchantUpdateCallback: txn.merchantUpdateCallbackURL,
    MerchantCancelCallback: txn.merchantCancelCallbackURL,
    ExternalRef: txn.processorTerminalRef,
    CreatedAt: txn.createdAt,
  });

  const txnTransformed = transformTxn(transaction);

  return (
    <>
      <Button
        type="default"
        icon={<BsEye />}
        size="middle"
        onClick={showLoading}
      />

      <Modal
        open={open}
        width={1000}
        loading={loading}
        onCancel={() => setOpen(false)}
        title={"Transaction: " + transaction._id}
        footer={
          <Button block type="default" onClick={showLoading}>
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

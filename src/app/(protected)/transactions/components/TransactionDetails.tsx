import React from "react";
import { Button, Modal } from "antd";
import { BsEye } from "react-icons/bs";
import { RxReload } from "react-icons/rx";

// {
//     "_id": "6648574ee18c5235e783f834",
//     "phone": "233200072904",
//     "amount": 1,
//     "desc": "Payment for some shoes",
//     "type": "collection",
//     "ref": "8c8c80f5d9f347f7a293",
//     "network": "Telecel",
//     "processor": "T-Cash",
//     "status": "pending",
//     "statusReason": "pending",
//     "reversed": false,
//     "merchantRef": "test collection",
//     "merchantCallbackURL": "https://webhook.site/4ebb8f50-55af-40fd-9eea-5e5aa1011275",
//     "merchant": "664856c8e18c5235e783f82b",
//     "originalAmount": 1,
//     "createdAt": "2024-05-18T07:22:54.542Z",
//     "updatedAt": "2024-05-18T07:22:57.694Z",
//     "__v": 0,
//     "processorInitialRef": "158799b82cc04314a5f657db624d6ff7",
//     "id": "6648574ee18c5235e783f834"
// }

export default function TransactionDetail({
  transaction,
}: {
  transaction: any;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button
        type="default"
        icon={<BsEye />}
        size="middle"
        onClick={showLoading}
      />

      <Modal
        title={"Transaction: " + transaction._id}
        footer={
          <Button block type="default" onClick={showLoading}>
            <RxReload />
            Check Status
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>₵ {parseFloat(transaction.amount).toFixed(2)}</p>
        <p>{transaction.phone}</p>
        <p>{transaction.status}</p>
        <p>{transaction.statusReason}</p>
      </Modal>
    </>
  );
}

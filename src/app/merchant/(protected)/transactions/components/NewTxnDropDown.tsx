import type { MenuProps } from "antd";
import { Button, Dropdown, theme } from "antd";
import CollectionTransaction from "./CollectionTransaction";
import DisbursementTransaction from "./DisbursementTransaction";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const NewTxnDropDown = () => {
  const { token } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      // icon: <TbLockAccess />,
      label: <CollectionTransaction />,
    },
    {
      key: "2",
      // icon: <TbLockAccess />,
      label: <DisbursementTransaction />,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button type="primary" icon={<FaMoneyBillTransfer />} size="middle">
        New Transaction
      </Button>
    </Dropdown>
  );
};

export default NewTxnDropDown;

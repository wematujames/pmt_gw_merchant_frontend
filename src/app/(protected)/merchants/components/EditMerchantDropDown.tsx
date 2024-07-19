import type { MenuProps } from "antd";
import { Button, Dropdown, theme } from "antd";
import { MdMoreVert } from "react-icons/md";
import { getRecColor } from "@/utils/common";
import { IoMdSwitch } from "react-icons/io";
import { GrConfigure } from "react-icons/gr";
import ConfigureMerchant from "./ConfigureMerchant";

const EditMerchantDropDown = ({ merchant }: { merchant: any }) => {
  const { token } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <GrConfigure />,
      label: <ConfigureMerchant merchant={merchant} />,
    },
    {
      key: "2",
      icon: <IoMdSwitch />,
      label: <a href="#!">{merchant?.active ? "Deactivate" : "Activate"}</a>,
      danger: merchant?.active ? true : false,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button
        type="default"
        icon={<MdMoreVert />}
        size="middle"
        style={{
          color: getRecColor(merchant.active, token),
          borderColor: getRecColor(merchant.active, token),
        }}
      />
    </Dropdown>
  );
};

export default EditMerchantDropDown;

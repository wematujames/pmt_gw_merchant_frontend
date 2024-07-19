"use client";

import { Button, Modal, Tag, theme, Typography } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPermissions } from "@/actions/permissions";
import { useState } from "react";
import { useMessage } from "@/hooks/useMessage";
import { MdUpdate } from "react-icons/md";
import { AxiosError } from "axios";
import { getRecColor } from "@/utils/common";

export default function ConfigureMerchant({ merchant }: { merchant: any }) {
  const queryClient = useQueryClient();
  const [perms, setPerms] = useState([] as string[]);
  const { openMessage } = useMessage();
  const [open, setOpen] = useState<boolean>(false);
  const { token } = theme.useToken();

  const updateMerchantConfigMutation = useMutation({
    mutationKey: ["upate-merchant-config"],
    mutationFn: () => updateUserPermissions(merchant._id as string, perms),
    onSuccess: () => {
      openMessage("success", "Merchant configuration updated");
      queryClient.invalidateQueries({ queryKey: ["platform-merchants"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  const handleSubmit = () => {
    updateMerchantConfigMutation.mutate();
  };

  return (
    <>
      <Typography.Text onClick={() => setOpen(true)}>Configure</Typography.Text>
      <Modal
        open={open}
        width={750}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Text
            style={{
              fontWeight: token.fontWeightStrong,
              color: token.colorPrimary,
              fontSize: token.fontSizeLG,
            }}
          >
            <Tag color={getRecColor(merchant.active, token)}>
              {merchant.active ? "Active" : "Inactive"}
            </Tag>
            {"Confirgure Merchant: " + merchant?.name}
          </Typography.Text>
        }
        footer={
          <Button block type="default" onClick={handleSubmit}>
            <MdUpdate />
            Save
          </Button>
        }
      >
        confirgure merchant
      </Modal>
    </>
  );
}

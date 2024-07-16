"use client";

import { Button, Checkbox, Col, Modal, Row } from "antd";
import { getPlatformPermissions } from "@/actions/permissions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateUserPermissions } from "@/actions/permissions";
import { useState } from "react";
import { useMessage } from "@/hooks/useMessage";
import { MdUpdate } from "react-icons/md";
import { TbLockAccess } from "react-icons/tb";

export default function Permissions({ user }: { user: any }) {
  const queryClient = useQueryClient();
  const [perms, setPerms] = useState([] as string[]);
  const { openMessage } = useMessage();
  const [open, setOpen] = useState<boolean>(false);

  const permissionsQuery = useQuery({
    queryKey: ["platform-permissions"],
    queryFn: () => getPlatformPermissions(),
  });

  const updateUserPermissionsMutation = useMutation({
    mutationKey: ["upate-user-permissions"],
    mutationFn: () => updateUserPermissions(user._id as string, perms),
    onSuccess: () => {
      openMessage("success", "User permissions updated");
      queryClient.invalidateQueries({ queryKey: ["platform-users"] });
    },
    onError: (err) => {
      console.log(err);
      openMessage("error", "Coult not update permissions");
    },
  });

  const onChange = (checkedValues: string[]) => {
    setPerms(checkedValues);
  };

  const handleSubmit = () => {
    updateUserPermissionsMutation.mutate();
  };

  return (
    <>
      <Button
        type="default"
        icon={<TbLockAccess />}
        size="middle"
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        width={750}
        loading={permissionsQuery.isPending}
        onCancel={() => setOpen(false)}
        title={"Permissions for: " + user?.person?.fName}
        footer={
          <Button block type="default" onClick={handleSubmit}>
            <MdUpdate />
            Update Permissions
          </Button>
        }
      >
        <Checkbox.Group
          defaultValue={user?.permissions?.map((p: any) => String(p)) || []}
          style={{ width: "100%" }}
          onChange={onChange}
        >
          <Row>
            {permissionsQuery.data?.map((i: any) => (
              <Col key={i._id} span={8}>
                <Checkbox value={i._id}>
                  {i.name.slice(0, 30) + (i.name?.length > 30 ? "..." : "")}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Modal>
    </>
  );
}

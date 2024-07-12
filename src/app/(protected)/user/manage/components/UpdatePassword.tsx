"use client";

import { loadUser, updatePassword } from "@/actions/auth";
import { useLogout } from "@/hooks/useLogout";
import { removeUndefinedValues } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
const { Option } = Select;
function UpdatePassword() {
  const logout = useLogout();

  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  const updateUserPassword = useMutation({
    mutationKey: ["update-current-user"],
    mutationFn: (data: any) =>
      updatePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmNewPassword
      ),
    onSuccess: () => logout(),
    onError: (err) => {},
  });

  const onFinish = (vals: any) => {
    const sanitized = removeUndefinedValues(vals);

    if (sanitized.newPassword !== sanitized.confirmNewPassword) return;

    updateUserPassword.mutate(sanitized);
  };

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form layout="vertical" requiredMark onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              rules={[
                { required: true, message: "Current password is required" },
              ]}
              name="currentPassword"
              label="Current Password"
            >
              <Input.Password type="password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[{ required: true, message: "New password is required" }]}
              name="newPassword"
              label="New Password"
            >
              <Input.Password type="password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="confirmNewPassword"
              rules={[{ required: true, message: "Confirm new password" }]}
              label="Confirm New Password"
            >
              <Input.Password type="password" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Flex>
  );
}

export default UpdatePassword;

"use client";

import { loadUser, updatePassword } from "@/actions/auth";
import { removeUndefinedValues } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
const { Option } = Select;
function UpdatePassword() {
  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  const updateUserPassword = useMutation({
    mutationKey: ["update-current-user"],
    mutationFn: (data: any) =>
      updatePassword(data.currentPassword, data.newPassword),
    onError: () => {},
  });

  const onFinish = (vals: any) => {
    const sanitized = removeUndefinedValues(vals);
    // console.log("sanitized", sanitized);
    // updateUserPassword.mutate(sanitized);
  };

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form layout="vertical" requiredMark onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="currentPassword" label="Current Password">
              <Input type="password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="newPassword" label="New Password">
              <Input type="password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Confirm New Password">
              <Input type="password" />
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

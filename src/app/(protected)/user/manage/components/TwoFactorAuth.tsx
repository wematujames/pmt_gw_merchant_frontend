"use client";

import { enable2Fa, getQrCode, loadUser } from "@/actions/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Input, Row } from "antd";

function TwoFactorAuth() {
  const onFinish = (vals: any) => {
    console.log("form vals", vals);
  };

  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  const generateQrCode = useQuery({
    queryKey: ["current-user-2fa-qrcode"],
    queryFn: () => getQrCode(),
  });

  const enableUser2Fa = useMutation({
    mutationKey: ["enable-2fa-current-user"],
    mutationFn: (data: any) => enable2Fa(data.verificationCode),
  });

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form layout="vertical" requiredMark onFinish={onFinish}>
        <Row>
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

export default TwoFactorAuth;

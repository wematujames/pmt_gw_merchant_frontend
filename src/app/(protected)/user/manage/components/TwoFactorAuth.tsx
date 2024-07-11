"use client";

import { enable2Fa, getQrCode } from "@/actions/auth";
import { removeUndefinedValues } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Image, Input, Row } from "antd";

function TwoFactorAuth() {
  const generateQrCode = useQuery({
    queryKey: ["current-user-2fa-qrcode"],
    queryFn: () => getQrCode(),
    refetchInterval: 28000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  const enableUser2Fa = useMutation({
    mutationKey: ["enable-2fa-current-user"],
    mutationFn: (data: any) => enable2Fa(data.verificationCode),
  });

  const onFinish = (vals: any) => {
    const sanitized = removeUndefinedValues(vals);
    enableUser2Fa.mutate(sanitized);
  };

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form layout="vertical" requiredMark onFinish={onFinish}>
        <Row>
          <Col span={24}>
            <Flex justify="center" align="center">
              <Image
                alt="2fa-qrcode"
                src={generateQrCode.data}
                width={250}
                height={250}
              />
            </Flex>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[
                { required: true, message: "Verification code is required" },
                { len: 6, message: "VC must be 6 characters" },
              ]}
              name="verificationCode"
              label="2FA Verification Code"
            >
              <Input />
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

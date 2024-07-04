"use client";

import { loadUser, updateUserEmail } from "@/actions/auth";
import { removeUndefinedValues } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Input, Row } from "antd";

function UpdateEmail() {
  const userQuery = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  const updateUserMutation = useMutation({
    mutationKey: ["update-current-user"],
    mutationFn: (data: any) => {
      console.log("mutation data", data);
      return updateUserEmail(data);
    },
    onError: (err) => {},
  });

  const onFinish = (vals: any) => {
    const sanitized = removeUndefinedValues(vals);
    console.log("sanitized", sanitized);
    // updateUserMutation.mutate(sanitized);
  };

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form
        initialValues={{
          currentEmail: userQuery.data?.email,
          newEmail: "",
          password: "",
        }}
        layout="vertical"
        requiredMark
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="currentEmail" label="Current Email">
              <Input readOnly type="email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="newEmail" label="New Email">
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="password" label="Password">
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

export default UpdateEmail;

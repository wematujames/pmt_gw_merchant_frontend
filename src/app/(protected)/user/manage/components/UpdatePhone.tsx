"use client";

import { loadUser, updateUserMobile } from "@/actions/auth";
import { removeUndefinedValues } from "@/utils/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Input, Row } from "antd";

function UpdatePhone() {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  const updateUserMobileMutation = useMutation({
    mutationKey: ["update-user-phone"],
    mutationFn: (data: any) => updateUserMobile(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      }),
    onError: (err) => {
      // console.log(err.response);
    },
  });

  const onFinish = (vals: any) => {
    const sanitized = removeUndefinedValues(vals);
    updateUserMobileMutation.mutate(sanitized);
  };

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form
        initialValues={{
          currentPhone: userQuery.data?.phone,
          newPhone: "",
          password: "",
        }}
        layout="vertical"
        requiredMark
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="currentPhone" label="Current Phone Number">
              <Input readOnly type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[{ required: true, message: "New email is required" }]}
              name="newPhone"
              label="New Phone Number"
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[{ required: true, message: "Password is required" }]}
              name="password"
              label="Password"
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

export default UpdatePhone;

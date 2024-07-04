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

  const updateUserPhone = useMutation({
    mutationKey: ["update-current-user"],
    mutationFn: (data: any) => updateUserMobile(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      }),
    onError: () => {},
  });

  const onFinish = (vals: any) => {
    const sanitized = removeUndefinedValues(vals);
    // console.log("sanitized", sanitized);
    // updateUserMutation.mutate(sanitized);
  };

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form
        initialValues={{
          currentPhone: userQuery.data?.phone,
          phone: "",
          // password: ""
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
            <Form.Item name="phone" label="New Phone Number">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="" label="Password">
              <Input readOnly type="password" />
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

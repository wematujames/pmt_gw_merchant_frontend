"use client";

import { loadUser, updateUser } from "@/actions/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Col, Flex, Form, Input, Row, Select } from "antd";
const { Option } = Select;
function UpdateProfile() {
  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: () => loadUser(),
  });

  const updateUserMutation = useMutation({
    mutationKey: ["update-current-user"],
    mutationFn: (data: any) => updateUser(data),
  });

  const onFinish = (vals: any) => {
    console.log("form vals", vals);
  };

  return (
    <Flex justify="center" flex="vertical" content="center">
      <Form layout="vertical" requiredMark onFinish={onFinish}>
        <Row gutter={15} style={{ width: "100%" }}>
          <Col lg={12}>
            <Form.Item name="fName" label="First Name">
              <Input placeholder="Wematu" />
            </Form.Item>
          </Col>

          <Col lg={12} style={{ width: "100%" }}>
            <Form.Item name="Last Name" label="Last Name">
              <Input placeholder="James" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={15} style={{ width: "100%" }}>
          <Col span={24}>
            <Form.Item name="email" label="Email">
              <Input
                addonAfter={<p>V: No</p>}
                placeholder="jwematu@nerasolgh.com"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="phone" label="Phone">
              <Input addonAfter={<p>V: No</p>} placeholder="233554268378" />
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

export default UpdateProfile;

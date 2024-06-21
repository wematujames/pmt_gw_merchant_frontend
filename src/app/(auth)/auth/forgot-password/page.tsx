"use client";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Flex, Divider, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "antd";
import styles from "./styles.module.css";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { forgotPassword } from "@/app/actions/auth";
import { ForgotPasswordData } from "@/types/types";

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const [api, contextHolder] = message.useMessage();

  const onFinish = useMutation({
    mutationKey: ["user-forgot-password"],
    mutationFn: (values: ForgotPasswordData) => forgotPassword(values.email),
    onSuccess: (res: AxiosResponse<{ message: string }>) => {
      api.success(res.data.message);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.log(err.response);
      api.error(err.response?.data.message);
    },
  });

  return (
    <>
      {contextHolder}
      <Flex
        className={styles.authLogin}
        justify="center"
        content="right"
        vertical
      >
        <Flex
          style={{ width: "100%" }}
          justify="center"
          align="center"
          vertical
        >
          <Link href="/">
            <Image
              src="/nerasollogo.png"
              alt="neraol-logo"
              width={180}
              height={80}
            />
          </Link>
        </Flex>
        <Flex
          style={{ width: "100%" }}
          justify="center"
          align="center"
          vertical
        >
          <Card className={styles.loginForm}>
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={(values) => onFinish.mutate(values)}
            >
              <Flex
                style={{ width: "100%" }}
                justify="center"
                align="center"
                vertical
              >
                <Title level={4}>Forgot Password</Title>
                <Divider style={{ background: "#e1e1ef", marginTop: 10 }} />
              </Flex>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

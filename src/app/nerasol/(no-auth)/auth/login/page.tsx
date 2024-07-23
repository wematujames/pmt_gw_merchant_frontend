"use client";

import { useRouter } from "next/navigation";
import { Form, Input, Button, Checkbox, Flex, Divider, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "antd";
import styles from "./styles.module.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/nerasol/actions/auth";
import { LoginCredentials } from "@/types/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import TwoFAModal from "./TwoFAModal";
import { useMessage } from "@/hooks/useMessage";

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { openMessage } = useMessage();
  const [loginToken, setLoginToken] = useState("null");
  const [open2faModal, setOpen2faModal] = useState(false);

  const onFinish = useMutation({
    mutationKey: ["login-user"],
    mutationFn: (credentials: LoginCredentials) =>
      login(credentials.email, credentials.password),
    onSuccess: (res) => {
      if (res.multiFAEnabled) {
        setOpen2faModal(true);
        setLoginToken(res.loginToken);
        return;
      }

      openMessage("success", "Logged in");
      router.push("/nerasol/dashboard/financial");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/nerasol/dashboard/financial");
    }
  });

  return (
    <>
      <TwoFAModal
        loginToken={loginToken}
        open={open2faModal}
        setOpen={setOpen2faModal}
      />
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
                <Title level={4}>Sign In To Your Account</Title>
                <Divider style={{ marginTop: 10 }} />
              </Flex>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a
                  href="/nerasol/auth/forgot-password"
                  style={{ float: "right" }}
                >
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <a href="/merchant/auth/login" style={{ float: "right" }}>
                  Merchant Sign In
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

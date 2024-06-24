"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordData } from "@/types/types";
import { resetPassword } from "@/actions/auth";
import { AxiosError } from "axios";
import {
  Form,
  Input,
  Button,
  Flex,
  Divider,
  Card,
  message,
  Typography,
} from "antd";

const { Title } = Typography;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [api, contextHolder] = message.useMessage();

  const [token, setToken] = useState<string | null>(null);

  const onFinish = useMutation({
    mutationKey: ["reset-user-password"],
    mutationFn: (data: ResetPasswordData) => {
      return resetPassword(
        searchParams.get("token") as string,
        data.newPassword
      );
    },
    onSuccess: (res) => {
      api.success(res.data.message, 3000, () => {
        router.push("/auth/login");
      });
    },
    onError: (err: AxiosError<Error>) => {
      api.error(err.response?.data.message as string);
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
                <Title level={4}>Reset Your Password</Title>
                <Divider style={{ background: "#e1e1ef", marginTop: 10 }} />
              </Flex>

              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="New Password"
                />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

export default function LoginPageSuspended() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}

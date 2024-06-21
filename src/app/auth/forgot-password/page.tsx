"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Flex, Divider, Card } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "antd";
import styles from "./styles.module.css";
const { Title } = Typography;
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await axios(
      "http://127.0.0.1:8249/api/v1/platform/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: { email, password },
      }
    );

    console.log(res.data.data);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.data.token);

      router.push("/dashboard");
    }
  };

  return (
    <Flex
      className={styles.authLogin}
      justify="center"
      content="right"
      vertical
    >
      <Flex style={{ width: "100%" }} justify="center" align="center" vertical>
        <Link href="/">
          <Image
            src="/nerasollogo.png"
            alt="neraol-logo"
            width={180}
            height={80}
          />
        </Link>
      </Flex>
      <Flex style={{ width: "100%" }} justify="center" align="center" vertical>
        <Card className={styles.loginForm}>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
              rules={[{ required: true, message: "Please input your email!" }]}
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
  );
}

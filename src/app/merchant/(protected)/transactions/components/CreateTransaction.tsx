import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  theme,
  Typography,
} from "antd";
import { useMessage } from "@/hooks/useMessage";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createTransaction } from "@/app/merchant/actions/transactions";
import { useForm } from "antd/es/form/Form";
import { InfoCircleOutlined, TransactionOutlined } from "@ant-design/icons";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export default function CreateTransaction() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { token } = theme.useToken();
  const { openMessage } = useMessage();
  const queryClient = new QueryClient();
  const [form] = useForm();

  const handleSubit = (vals: FormData) => {
    console.log("form vals", vals);
  };

  const createTransactionMutation = useMutation({
    mutationKey: ["upate-user-permissions"],
    mutationFn: () =>
      createTransaction(
        form.getFieldValue("transactionId"),
        form.getFieldValue("reversalAmount")
      ),
    onSuccess: () => {
      openMessage("success", "User permissions updated");
      queryClient.invalidateQueries({ queryKey: ["platform-users"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  return (
    <>
      <Button
        type="primary"
        icon={<FaMoneyBillTransfer />}
        size="middle"
        onClick={() => setOpen(true)}
      >
        Create
      </Button>

      <Modal
        open={open}
        width={1000}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Title level={5}>
            <TransactionOutlined />
            {""} Create Transaction
          </Typography.Title>
        }
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Popconfirm
              title="Reverse Transaction"
              description="Reverse this transaction ?"
              icon={<InfoCircleOutlined style={{ color: "yellow7" }} />}
              onConfirm={form.submit}
            >
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Popconfirm>
          </>
        }
      >
        <Form form={form} layout="vertical" requiredMark onFinish={handleSubit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Account">
                <Input placeholder="233554268378" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="desc" label="Description">
                <Input placeholder="Payment for some shoes" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="network" label="Network">
                <Select defaultActiveFirstOption defaultValue="">
                  <Select.Option value="AirtelTigo">AirtelTigo</Select.Option>
                  <Select.Option value="MTN">MTN</Select.Option>
                  <Select.Option value="Telecel">Telecel</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="Type">
                <Select defaultActiveFirstOption defaultValue="collection">
                  <Select.Option value="collection">Collection</Select.Option>
                  <Select.Option value="disbursement">
                    Disbursement
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

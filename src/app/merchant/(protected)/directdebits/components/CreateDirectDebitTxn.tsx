import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  theme,
  Typography,
} from "antd";
import { useMessage } from "@/hooks/useMessage";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createDDebitTxn } from "@/app/merchant/actions/directdebitmandate";
import { useForm } from "antd/es/form/Form";
import { InfoCircleOutlined, TransactionOutlined } from "@ant-design/icons";
import { BsBackspaceReverse } from "react-icons/bs";
import { getRecColor } from "@/utils/common";

export default function CreateDirectDebitTransaction({
  mandate,
}: {
  mandate: any;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { token } = theme.useToken();
  const { openMessage } = useMessage();
  const queryClient = new QueryClient();
  const [form] = useForm();

  const handleSubmit = (vals: any) => {
    console.log("form vals", vals);
    createDDebitTxnMutation.mutate(vals);
  };

  const createDDebitTxnMutation = useMutation({
    mutationKey: ["direct-debit-mandate-txn"],
    mutationFn: (data) => createDDebitTxn(data),
    onSuccess: () => {
      openMessage("success", "Transaction Processing");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["platform-users"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  return (
    <>
      {mandate.active && (
        <Button
          type="default"
          icon={<BsBackspaceReverse />}
          size="middle"
          style={{
            color: getRecColor(
              mandate.statusReason === "pending" ? "pending" : mandate.active,
              token
            ),
            borderColor: getRecColor(
              mandate.statusReason === "pending" ? "pending" : mandate.active,
              token
            ),
          }}
          onClick={() => setOpen(true)}
        />
      )}

      <Modal
        open={open}
        width={500}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Title level={5}>
            <TransactionOutlined /> NEW DIRECT DEBIT TRANSACTION
          </Typography.Title>
        }
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Popconfirm
              title="Debit account with mandate ?"
              icon={<InfoCircleOutlined style={{ color: "yellow7" }} />}
              onConfirm={form.submit}
              okText="Yes"
              cancelText="No"
            >
              <Button htmlType="submit" type="primary">
                Debit
              </Button>
            </Popconfirm>
          </>
        }
      >
        <Form
          initialValues={{
            mandateId: mandate._id,
            amount: mandate.amount,
          }}
          form={form}
          layout="vertical"
          requiredMark
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Mobile account number is required",
                  },
                ]}
                name="mandateId"
                label="MandateId"
              >
                <Input readOnly placeholder="233554268378" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                required
                rules={[
                  {
                    required: true,
                    message: "Transaction amount is required",
                  },
                ]}
                name="amount"
                label="Amount"
              >
                <Input type="number" min={0} placeholder="233554268378" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

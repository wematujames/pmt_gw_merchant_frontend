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
import { getRecColor } from "@/utils/common";
import { useMessage } from "@/hooks/useMessage";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { reverseTransaction } from "@/app/merchant/actions/transactions";
import { useForm } from "antd/es/form/Form";
import { BsBackspaceReverse } from "react-icons/bs";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function ReverseTransaction({ txn }: { txn: any }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { token } = theme.useToken();
  const { openMessage } = useMessage();
  const queryClient = new QueryClient();
  const [form] = useForm();

  const handleSubit = (vals: any) => {
    reverseTxnMutation.mutate(vals);
  };

  const reverseTxnMutation = useMutation({
    mutationKey: ["reverse-transaction"],
    mutationFn: (data: any) =>
      reverseTransaction(data.transactionId, data.reversalAmount),
    onSuccess: () => {
      openMessage("info", "Reversal processing");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  return (
    <>
      {txn?.status === "successful" && (
        <Button
          type="default"
          icon={<BsBackspaceReverse />}
          size="middle"
          style={{
            color: getRecColor(txn.status, token),
            borderColor: getRecColor(txn.status, token),
          }}
          onClick={() => setOpen(true)}
        />
      )}

      <Modal
        open={open}
        width={400}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Title level={5}>Reverse Transaction</Typography.Title>
        }
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Popconfirm
              title="Reverse this transaction ? "
              icon={<InfoCircleOutlined style={{ color: "yellow7" }} />}
              onConfirm={form.submit}
              okText="Yes"
              cancelText="No"
            >
              <Button htmlType="submit" type="primary">
                Reverse
              </Button>
            </Popconfirm>
          </>
        }
      >
        <Form
          initialValues={{
            transactionId: txn._id,
            reversalAmount: txn.amount,
          }}
          form={form}
          layout="vertical"
          requiredMark
          onFinish={handleSubit}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="transactionId" label="Transaction ID">
                <Input readOnly placeholder="6648574ee18c5235e783f834" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                required
                rules={[
                  { required: true, message: "Please enter reversal amount" },
                ]}
                name="reversalAmount"
                label="Reversal Amount"
              >
                <Input type="number" min={1} max={txn.amount} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

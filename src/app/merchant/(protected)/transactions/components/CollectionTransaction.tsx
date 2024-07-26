import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  theme,
  Typography,
} from "antd";
import { useMessage } from "@/hooks/useMessage";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createCollectionTxn } from "@/app/merchant/actions/transactions";
import { useForm } from "antd/es/form/Form";
import {
  InfoCircleOutlined,
  MoneyCollectFilled,
  TransactionOutlined,
} from "@ant-design/icons";

export default function CollectionTransaction() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { token } = theme.useToken();
  const [txn, setTxnType] = useState("collection");
  const { openMessage } = useMessage();
  const queryClient = new QueryClient();
  const [form] = useForm();

  const handleSubmit = (vals: any) => {
    createColTxnMutation.mutate(vals);
  };

  const createColTxnMutation = useMutation({
    mutationKey: ["create-momo-collection"],
    mutationFn: (data) => createCollectionTxn(data),
    onSuccess: () => {
      openMessage("info", "Transaction processing");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  return (
    <>
      <Space>
        <MoneyCollectFilled />
        <Typography.Text onClick={() => setOpen(true)}>
          MoMo Collection
        </Typography.Text>
      </Space>

      <Modal
        open={open}
        width={500}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Title level={5}>
            <TransactionOutlined /> MOMO COLLECTION
          </Typography.Title>
        }
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Popconfirm
              title="Initiate transaction ?"
              icon={<InfoCircleOutlined style={{ color: "yellow7" }} />}
              onConfirm={form.submit}
              okText="Yes"
              cancelText="No"
            >
              <Button htmlType="submit" type="primary">
                Create
              </Button>
            </Popconfirm>
          </>
        }
      >
        <Form
          initialValues={{
            phone: "",
            amount: "",
            desc: "",
            network: "MTN",
          }}
          form={form}
          layout="vertical"
          requiredMark
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={17}>
              <Form.Item
                rules={[
                  {
                    // pattern:
                    required: true,
                    message: "Mobile is required",
                  },
                ]}
                name="phone"
                label="Account"
              >
                <Input type="number" min={0} placeholder="233554268378" />
              </Form.Item>
            </Col>

            <Col span={7}>
              <Form.Item name="network" label="Network">
                <Select defaultActiveFirstOption defaultValue="">
                  <Select.Option value="AirtelTigo">AirtelTigo</Select.Option>
                  <Select.Option value="MTN">MTN</Select.Option>
                  <Select.Option value="Telecel">Telecel</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={7}>
              <Form.Item
                required
                rules={[{ required: true, message: "Txn amount is required" }]}
                name="amount"
                label="Amount"
              >
                <Input type="number" min={0.1} placeholder="1.00" />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item
                rules={[
                  { required: true, message: "Txn description is required" },
                ]}
                name="desc"
                label="Description"
              >
                <Input placeholder="Payment for some shoes" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

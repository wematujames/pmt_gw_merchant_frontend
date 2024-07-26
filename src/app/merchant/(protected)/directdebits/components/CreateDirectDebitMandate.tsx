import React from "react";
import {
  Button,
  Col,
  DatePicker,
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
import { createDDebitMandate } from "@/app/merchant/actions/directdebitmandate";
import { useForm } from "antd/es/form/Form";
import { InfoCircleOutlined, MoneyCollectTwoTone } from "@ant-design/icons";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export default function CreateDirectDebit() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { token } = theme.useToken();
  const { openMessage } = useMessage();
  const queryClient = new QueryClient();
  const [form] = useForm();

  const handleSubmit = (vals: any) => {
    console.log("form vals", vals);
    createDDebitMandateMutation.mutate(vals);
  };

  const createDDebitMandateMutation = useMutation({
    mutationKey: ["create-direct-debit-mandate"],
    mutationFn: (data) => createDDebitMandate(data),
    onSuccess: () => {
      openMessage("success", "User permissions updated");
      form.resetFields();
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
        Create New Mandate
      </Button>

      <Modal
        open={open}
        width={500}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Title level={5}>
            <MoneyCollectTwoTone />
            {""} CREATE DIRECT DEBIT MANDATE
          </Typography.Title>
        }
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Popconfirm
              title="Create Mandate ?"
              icon={<InfoCircleOutlined style={{ color: "yellow7" }} />}
              onConfirm={() => {
                form.setFieldValue("agreeTnC", true);
                form.submit;
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button htmlType="submit" type="primary">
                Create Mandate
              </Button>
            </Popconfirm>
          </>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark
          initialValues={{
            phone: "",
            amount: "",
            desc: "",
            network: "MTN",
            frequency: "03",
            firstPaymentDate: null,
            expiryDate: null,
            agreeTnC: false,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                rules={[
                  { required: true, message: "Mobile number is required" },
                ]}
                name="phone"
                label="Account"
              >
                <Input type="number" min={0} placeholder="233554268378" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                rules={[{ required: true, message: "Amount is required" }]}
                name="amount"
                label="Amount"
              >
                <Input type="number" min={0} placeholder="1.00" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                rules={[
                  { required: true, message: "Mandate descripion is required" },
                ]}
                name="desc"
                label="Description"
              >
                <Input placeholder="Payment for some shoes" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="network" label="Network">
                <Select defaultActiveFirstOption>
                  <Select.Option value="AirtelTigo">AirtelTigo</Select.Option>
                  <Select.Option value="MTN">MTN</Select.Option>
                  <Select.Option value="Telecel">Telecel</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="frequency" label="Frequency">
                <Select defaultActiveFirstOption>
                  <Select.Option value="02">Daily</Select.Option>
                  <Select.Option value="03">Weekly</Select.Option>
                  <Select.Option value="04">Monthly</Select.Option>
                  <Select.Option value="05">Quarterly</Select.Option>
                  <Select.Option value="05">Half Yearly</Select.Option>
                  <Select.Option value="05">Yealy</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="dateTime"
                label="First Payment - End Date"
                rules={[{ required: true, message: "Select mandate duration" }]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

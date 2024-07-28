import { useMessage } from "@/hooks/useMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import {
  disableWebTxns,
  enableWebTxns,
  isWebTxnsEnabled,
} from "../../actions/transactions";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "antd/es/form/Form";

function WebTransactions() {
  const { token } = theme.useToken();
  const queryClient = useQueryClient();
  const { openMessage } = useMessage();
  const [open, setOpen] = React.useState<boolean>(false);
  const [form] = useForm();

  const isWebTxnsEnabledQuery = useQuery({
    queryKey: ["is-web-txn-enabled"],
    queryFn: () => isWebTxnsEnabled(),
  });

  const enableWebTxnsMutation = useMutation({
    mutationKey: ["enable-web-txns"],
    mutationFn: ({
      merchantId,
      merchantSecret,
    }: {
      merchantId: string;
      merchantSecret: string;
    }) => enableWebTxns(merchantId, merchantSecret),
    onSuccess: () => {
      openMessage("success", "Web txns enabled");
      form.resetFields();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["is-web-txn-enabled"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  const disableWebTxnsMutation = useMutation({
    mutationKey: ["disable-web-txns"],
    mutationFn: () => disableWebTxns(),
    onSuccess: () => {
      openMessage("success", "Web txns disabled");
      queryClient.invalidateQueries({ queryKey: ["is-web-txn-enabled"] });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      openMessage("error", err.response?.data.message || err.message);
    },
  });

  const currentMerchant = queryClient.getQueryData(["current-user"]) as any;

  const handleChange = (checked: boolean) => {
    if (!checked) return disableWebTxnsMutation.mutate();

    setOpen(true);
  };

  const handleSubmit = (data: any) => {
    enableWebTxnsMutation.mutate({
      merchantId: currentMerchant.merchantId,
      merchantSecret: data.merchantSecret,
    });
  };

  return (
    <>
      <Modal
        open={open}
        width={500}
        onCancel={() => setOpen(false)}
        title={
          <Typography.Title level={5}>ENABLE WEB TRANSACTIONS</Typography.Title>
        }
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Popconfirm
              title="Enable web transactions ?"
              onConfirm={form.submit}
              okText="Yes"
              cancelText="No"
            >
              <Button htmlType="submit" type="primary">
                Enable
              </Button>
            </Popconfirm>
          </>
        }
      >
        <Form
          initialValues={{
            merchantId: currentMerchant?.merchantId,
            merchantSecret: "",
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
                  { required: true, message: "Merchant secret is required" },
                ]}
                name="merchantSecret"
                label="Merchant Secret"
              >
                <Input type="text" placeholder="Merchant Secret" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Space direction="horizontal" style={{ marginRight: 20 }}>
        <Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
          Web Txns:
        </Typography.Text>
        <Switch
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={handleChange}
          checked={isWebTxnsEnabledQuery.data?.enabled}
          loading={isWebTxnsEnabledQuery.isPending}
        />
      </Space>
    </>
  );
}

export default WebTransactions;

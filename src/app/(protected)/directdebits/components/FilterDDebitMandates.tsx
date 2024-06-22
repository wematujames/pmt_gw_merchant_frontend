import { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { FiFilter } from "react-icons/fi";

const { Option } = Select;

export default function FilterTransaction({
  txnsQuery,
  filter,
  setFilter,
}: {
  txnsQuery: any;
  filter: any;
  setFilter: any;
}) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (vals: any) => {
    onClose();

    setFilter((prev: any) => ({ ...prev, ...vals }));

    if (vals.dateTime?.length) {
      setFilter((prev: any) => ({ ...prev, startDate: vals.dateTime[0].$d }));
      setFilter((prev: any) => ({ ...prev, endDate: vals.dateTime[1].$d }));
    }

    setFilter((prev: any) => ({ ...prev, dateTime: undefined }));

    txnsQuery.refetch(filter);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={showDrawer}
        icon={<FiFilter />}
      >
        Filter
      </Button>
      <Drawer
        title="Filter Transactions"
        width={720}
        onClose={onClose}
        open={open}
      >
        <Form layout="vertical" requiredMark onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="_id" label="Mandate ID">
                <Input placeholder="6648574ee18c5235e783f834" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Account">
                <Input placeholder="233554268378" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="merchant" label="Merchant">
                <Select defaultActiveFirstOption defaultValue="">
                  <Option value="">All</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="active" label="Status">
                <Select defaultActiveFirstOption defaultValue="">
                  <Option value="">All</Option>
                  <Option value="true">Active</Option>
                  <Option value="false">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: "Select date range" }]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Form.Item>
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

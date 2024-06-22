"use client";
import { Flex, Space, Table, TableColumnsType, theme } from "antd";
import TransactionDetail from "./DDebitMandatesDetails";
import FilterTransaction from "./FilterDDebitMandates";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getDirectDebitMandates } from "@/app/actions/directdebitmandate";
import moment from "moment";

const columns: TableColumnsType = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
    ellipsis: { showTitle: true },
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record._id}</p>
        <small>{record.merchantRef}</small>
        <small>{record.merchant}</small>
      </Space>
    ),
  },
  {
    title: "Amount ",
    dataIndex: "amount",
    key: "amount",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>₵ {parseFloat(record.amount).toFixed(2)}</p>
      </Space>
    ),
  },
  {
    title: "Account",
    dataIndex: "phone",
    key: "phone",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.phone}</p>
        <small>{record.desc}</small>
      </Space>
    ),
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.frequency}</p>
        <small>N: {moment(record.nextPaymentDate).format("YYYY-MM-DD")}</small>
        <small>E: {moment(record.expiryDate).format("YYYY-MM-DD")}</small>
      </Space>
    ),
  },
  {
    title: "Network",
    dataIndex: "network",
    key: "network",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.network}</p>
        <small>{record.processor}</small>
      </Space>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "network",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.active ? "Active" : "Inactive"}</p>
        <small>{record.statusReason}</small>
      </Space>
    ),
  },
  {
    title: "ExternId",
    dataIndex: "processorTerminalRef",
    key: "processorTerminalRef",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.processorTerminalRef || "N/A"}</p>
        <small>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</small>
      </Space>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <Space size={0}>
        <TransactionDetail transaction={record} />
      </Space>
    ),
  },
];

function TransactionReport() {
  const { token } = theme.useToken();
  const [filter, setFilter] = useState({});

  const txnsQuery = useQuery({
    queryKey: ["ddebit-mandates", filter],
    queryFn: () => getDirectDebitMandates(filter),
  });

  return (
    <Table
      title={() => (
        <Flex justify="space-between">
          <Space
            style={{
              fontSize: token.fontSizeHeading5,
            }}
          >
            <MdNumbers size={token.fontSizeIcon} />
            Count:{txnsQuery?.data?.length}
          </Space>
          <FilterTransaction
            filter={filter}
            setFilter={setFilter}
            txnsQuery={txnsQuery}
          />
        </Flex>
      )}
      loading={txnsQuery.isLoading}
      sticky
      size="small"
      rowHoverable
      scroll={{ x: true }}
      dataSource={txnsQuery.data}
      columns={columns}
    />
  );
}

export default TransactionReport;

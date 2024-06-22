"use client";
import { Flex, Space, Table, TableColumnsType, theme } from "antd";
import TransactionDetail from "./TransactionDetails";
import FilterTransaction from "./FilterTransactions";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { getTransactions } from "@/app/actions/transactions";
import { useQuery } from "@tanstack/react-query";

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
        <small>{record.type}</small>
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
        <p>{record.status}</p>
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
        <small>{record.createdAt}</small>
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
    queryKey: ["transactions", filter],
    queryFn: () => getTransactions(filter),
  });

  console.log("txn filterr", filter);
  console.log(txnsQuery.data?.length);

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
      rowHoverable
      scroll={{ x: true }}
      dataSource={txnsQuery.data}
      columns={columns}
    />
  );
}

export default TransactionReport;

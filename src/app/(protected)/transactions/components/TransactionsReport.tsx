"use client";
import { Button, Flex, Space, Table, TableColumnsType, theme } from "antd";
import TransactionDetail from "./TransactionDetails";
import FilterTransaction from "./FilterTransactions";
import { useRef, useState } from "react";
import { MdNumbers } from "react-icons/md";
import { getTransactions } from "@/actions/transactions";
import { useInfiniteQuery } from "@tanstack/react-query";
import moment from "moment";
import exportData from "@/utils/exportData";
import { BiExport } from "react-icons/bi";
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
        <small>
          {record.desc?.length > 12
            ? record.desc?.slice(0, 12) + "..."
            : record.desc}
        </small>
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
    key: "status",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.status}</p>
        <small>
          {record.statusReason?.length > 10
            ? record.statusReason?.slice(0, 10) + "..."
            : record.statusReason}
        </small>
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
    width: 80,
    render: (_: any, record: any) => (
      <Space size={0}>
        <TransactionDetail transaction={record} />
      </Space>
    ),
  },
];

function TransactionReport() {
  const { token } = theme.useToken();

  const [filter, setFilter] = useState({
    startDate: moment().startOf("day").toISOString(),
    endDate: moment().endOf("day").toISOString(),
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const tableRef = useRef(null);

  const txnsQuery = useInfiniteQuery({
    queryKey: ["transactions", filter],
    queryFn: ({ pageParam = 1 }) => getTransactions({ pageParam, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.pagination?.next?.page || false;
    },
  });

  // const fetchNextPage = () => {
  //   if (txnsQuery.hasNextPage && !txnsQuery.isFetchingNextPage) {
  //     txnsQuery.fetchNextPage();
  //   }
  // };

  const transactions = txnsQuery.data?.pages.flatMap((page) => page.data) || [];

  return (
    <Table
      title={() => (
        <Flex justify="space-between">
          <Space style={{ fontSize: token.fontSizeHeading5 }}>
            <MdNumbers size={token.fontSizeIcon} />
            Count: {transactions.length}
          </Space>
          <Space>
            <FilterTransaction
              filter={filter}
              setFilter={setFilter}
              txnsQuery={txnsQuery}
            />
            <Button
              size="large"
              icon={<BiExport />}
              type="primary"
              disabled={txnsQuery.isFetching || !transactions.length}
              onClick={() => exportData(transactions, "transactions")}
            >
              Export
            </Button>
          </Space>
        </Flex>
      )}
      loading={txnsQuery.isLoading}
      rowHoverable
      scroll={{ x: "max-content" }}
      dataSource={transactions}
      columns={columns}
      size="small"
      rowKey="_id"
    />
  );
}

export default TransactionReport;

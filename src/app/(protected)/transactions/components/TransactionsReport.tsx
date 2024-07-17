"use client";
import { Button, Flex, Space, Table, TableColumnsType, theme } from "antd";
import TransactionDetail from "./TransactionDetails";
import FilterTransaction from "./FilterTransactions";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { getTransactions } from "@/actions/transactions";
import { useInfiniteQuery } from "@tanstack/react-query";
import moment from "moment";
import exportData from "@/utils/exportData";
import { BiExport } from "react-icons/bi";
import { TbReload } from "react-icons/tb";

function TransactionReport() {
  const { token } = theme.useToken();

  const getRecColor = (status: string) => {
    switch (status) {
      case "successful":
        return token["green7"];
      case "pending":
        return token["yellow7"];
      case "failed":
        return token["red7"];
      default:
        return "black";
    }
  };

  const columns: TableColumnsType = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ellipsis: { showTitle: true },
      render: (_: any, record: any) => (
        <Space direction="vertical">
          <p style={{ fontWeight: token.fontWeightStrong }}>{record._id}</p>
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
        <Space direction="vertical">
          <p style={{ fontWeight: token.fontWeightStrong }}>
            ₵ {parseFloat(record.amount).toFixed(2)}
          </p>
          <small
            style={{
              color: getRecColor(record.status),
              fontWeight: token.fontWeightStrong,
            }}
          >
            {record.type}
          </small>
        </Space>
      ),
    },
    {
      title: "Account",
      dataIndex: "phone",
      key: "phone",
      render: (_: any, record: any) => (
        <Space direction="vertical">
          <p style={{ fontWeight: token.fontWeightStrong }}>{record.phone}</p>
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
        <Space direction="vertical">
          <p style={{ fontWeight: token.fontWeightStrong }}>{record.network}</p>
          <small>{record.processor}</small>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <Space
          style={{
            color: getRecColor(record.status),
            fontWeight: token.fontWeightStrong,
          }}
          direction="vertical"
        >
          <p>{record.status}</p>
          <small>
            {record.statusReason?.length > 15
              ? record.statusReason?.slice(0, 15) + "..."
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
        <Space direction="vertical">
          <p>{record.processorTerminalRef || "N/A"}</p>
          <small>
            {moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </small>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_: any, record: any) => (
        <Space>
          <TransactionDetail status={record.status} txnId={record._id} />
        </Space>
      ),
    },
  ];

  const [filter, setFilter] = useState({
    startDate: moment().startOf("day").toISOString(),
    endDate: moment().endOf("day").toISOString(),
  });

  const txnsQuery = useInfiniteQuery({
    queryKey: ["transactions", filter],
    queryFn: ({ pageParam = 1 }) => getTransactions({ pageParam, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.pagination?.next?.page || false;
    },
  });

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
              disabled={txnsQuery.isFetching || !transactions?.length}
              onClick={() => exportData(transactions, "transactions")}
              title="Export"
            />
            <Button
              size="large"
              icon={<TbReload />}
              type="primary"
              disabled={txnsQuery.isFetching}
              onClick={() => txnsQuery.refetch()}
              title="Reload"
            />
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

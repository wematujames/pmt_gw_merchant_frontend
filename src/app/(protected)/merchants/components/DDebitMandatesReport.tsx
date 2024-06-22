"use client";
import { Flex, Space, Table, TableColumnsType, theme } from "antd";
import TransactionDetail from "./DDebitMandatesDetails";
import FilterTransaction from "./FilterDDebitMandates";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getPlatformMerchants } from "@/app/actions/merchants";

const columns: TableColumnsType = [
  {
    title: "Merchant ID",
    dataIndex: "_id",
    key: "_id",
    ellipsis: { showTitle: true },
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.merchantId}</p>
        <small>{record._id}</small>
        <small>{record.active ? "Active" : "Inactive"}</small>
      </Space>
    ),
  },
  {
    title: "Account Name",
    dataIndex: "name",
    key: "name",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.name}</p>
      </Space>
    ),
  },
  {
    title: "Contact",
    dataIndex: "phone",
    key: "phone",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.phone}</p>
        <small>{record.email}</small>
        <small>
          PV: {record.phoneVerified ? "Yes   " : "No   "}
          EV: {record.emailVerified ? "Yes" : "No"}
        </small>
      </Space>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.createdBy}</p>
      </Space>
    ),
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
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
    queryKey: ["platform-merchants", filter],
    queryFn: () => getPlatformMerchants(filter),
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

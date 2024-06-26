"use client";
import { Flex, Space, Table, TableColumnsType, theme } from "antd";
import TransactionDetail from "./MerchantDetails";
import FilterTransaction from "./FilterMerchants";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { getPlatformMerchants } from "@/actions/merchants";

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
        <Space size={20}>
          <small>{record.active ? "Active" : "Inactive"}</small>
          <small>
            PV: {record.phoneVerified ? "Yes   " : "No   "}
            EV: {record.emailVerified ? "Yes" : "No"}
          </small>
        </Space>
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
      scroll={{ x: "max-content" }}
      dataSource={txnsQuery.data}
      columns={columns}
    />
  );
}

export default TransactionReport;

"use client";
import { Flex, Space, Table, TableColumnsType, theme } from "antd";
import FilterTransaction from "./FilterUsers";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getPlatformUsers } from "@/actions/users";
import UserDetail from "./UserDetails";
import moment from "moment";

const columns: TableColumnsType = [
  {
    title: "Name",
    dataIndex: "person",
    key: "person",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>
          {record.person?.title} {record.person?.fName} {record.person?.lName}
        </p>
        <small>{record.email}</small>
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
        <small>
          PV: {record.phoneVerified ? "Yes   " : "No   "}
          EV: {record.emailVerified ? "Yes" : "No"}
        </small>
      </Space>
    ),
  },
  {
    title: "Status",
    dataIndex: "active",
    key: "active",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.active ? "Active" : "Inactive"}</p>
        <p>{record.role}</p>
      </Space>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (_: any, record: any) => (
      <Space size={0} direction="vertical">
        <p>{record.createdBy || "N/A"}</p>
        <small>{moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss")}</small>
      </Space>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <Space size={0}>
        <UserDetail transaction={record} />
      </Space>
    ),
  },
];

function TransactionReport() {
  const { token } = theme.useToken();
  const [filter, setFilter] = useState({});

  const txnsQuery = useQuery({
    queryKey: ["transactions", filter],
    queryFn: () => getPlatformUsers(filter),
  });

  console.log(txnsQuery.data);

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
      size="small"
    />
  );
}

export default TransactionReport;

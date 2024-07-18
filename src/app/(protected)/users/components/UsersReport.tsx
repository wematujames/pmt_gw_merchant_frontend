"use client";
import { Flex, Space, Table, TableColumnsType, Tag, theme } from "antd";
import FilterUsers from "./FilterUsers";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getPlatformUsers } from "@/actions/users";
import UserDetail from "./UserDetails";
import moment from "moment";
import CreateUser from "./CreateUser";
import Permissions from "./Permissions";
import { getRecColor } from "@/utils/common";

function UsersReport() {
  const { token } = theme.useToken();
  const [filter, setFilter] = useState({});

  const txnsQuery = useQuery({
    queryKey: ["platform-users", filter],
    queryFn: () => getPlatformUsers(filter),
  });

  const columns: TableColumnsType = [
    {
      title: "Name",
      dataIndex: "person",
      key: "person",
      render: (_: any, record: any) => (
        <Space size={0} direction="vertical">
          <p>
            {record?.person?.title} {record?.person?.fName}{" "}
            {record?.person?.lName}
          </p>
          <small>{record?.email}</small>
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
          <Space size={5} direction="horizontal">
            <small style={{ color: getRecColor(record.phoneVerified, token) }}>
              PV: {record.phoneVerified ? "Yes   " : "No   "}
            </small>
            <small style={{ color: getRecColor(record.emailVerified, token) }}>
              EV: {record.emailVerified ? "Yes" : "No"}
            </small>
          </Space>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      // width: 80,
      render: (_: any, record: any) => (
        <Space color="green7" size={0} direction="vertical">
          <Tag color={getRecColor(record.active, token)} style={{ margin: 0 }}>
            {record.active ? "Active" : "Inactive"}
          </Tag>
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
        <Space size={5}>
          <UserDetail user={record} />
          <Permissions user={record} />
        </Space>
      ),
    },
  ];

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
          <Space>
            <FilterUsers
              filter={filter}
              setFilter={setFilter}
              txnsQuery={txnsQuery}
            />
            <CreateUser />
          </Space>
        </Flex>
      )}
      loading={txnsQuery.isLoading}
      sticky
      rowHoverable
      scroll={{ x: "max-content" }}
      dataSource={txnsQuery.data}
      columns={columns}
      size="small"
    />
  );
}

export default UsersReport;

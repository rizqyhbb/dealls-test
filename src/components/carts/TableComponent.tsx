import React from "react";
import { Box } from "../shared/Box";
import { Button, Table } from "antd";
import { useRouter } from "next/router";

export const TableComponent = ({ data }: any) => {
  const router = useRouter();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "id",
    },
    {
      title: "Products",
      dataIndex: "totalProducts",
      key: "id",
    },
    {
      title: "Quantity",
      dataIndex: "totalQuantity",
      key: "id",
    },
    {
      title: "Discount",
      dataIndex: "discountedTotal",
      key: "id",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "id",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "120px",
      render: (id: number) => (
        <Button
          onClick={() => router.push({ pathname: `${router.pathname}/${id}` })}
        >
          See detail
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Table
        dataSource={data.carts}
        columns={columns}
        rowKey={(rec) => rec.id}
        pagination={{
          total: data.total,
          showSizeChanger: false,
          onChange: (page) => {
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page },
            });
          },
        }}
      />
    </Box>
  );
};

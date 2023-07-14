import React from "react";
import { Box } from "../shared/Box";
import { Button, Table, Tag } from "antd";
import { useRouter } from "next/router";
import { ICart, ICarts } from "../../pages/carts";
import { Text } from "../shared/Text";

export const TableComponent = ({
  data,
  loading,
}: {
  data: ICarts;
  loading: boolean;
}) => {
  const router = useRouter();
  const columns = [
    {
      title: "Id",
      key: "id",
      render: (val: ICart) => {
        return (
          <Box>
            <Text fontWeight={"bold"}>#{val.id}</Text>
            <Tag color="cyan" bordered={false}>
              user id: {val.userId}
            </Tag>
          </Box>
        );
      },
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
          Detail
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Table
        loading={loading}
        dataSource={data?.carts}
        columns={columns}
        rowKey={(rec) => rec.id}
        pagination={{
          total: data?.total,
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

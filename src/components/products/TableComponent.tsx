import { Table, Tag } from "antd";
import React, { FC } from "react";
import { Box } from "../shared/Box";
import { useRouter } from "next/router";
import { Text } from "../shared/Text";
import { TbDiscount2 } from "react-icons/tb";
import { Flex } from "../shared/Flex";

interface IProduct {
  [key: string]: string;
}

export interface OwnProps {
  data: {
    products: IProduct[] | [];
    total: number;
  };
  loading: boolean;
}

export const TableComponent: FC<OwnProps> = ({ data, loading }) => {
  const router = useRouter();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      key: "id",
      render: (val) => {
        return (
          <Box>
            <Text fontWeight={"bold"}>{val.title}</Text>
            <Text fontSize={0}>{val.brand}</Text>
            <Tag bordered={false} color="processing">
              {val.category}
            </Tag>
          </Box>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
    {
      title: "Price",
      key: "id",
      render: (val) => {
        return (
          <Box>
            <Text fontWeight={"bold"} textAlign={"end"}>
              ${val.price}.00
            </Text>
            <Flex alignItems={"center"}>
              <TbDiscount2 color="green" size={20} />
              <Text color={"green"} style={{ whiteSpace: "nowrap" }}>
                {val.discountPercentage}%
              </Text>
            </Flex>
          </Box>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "id",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "id",
    },
  ];

  return (
    <Table
      dataSource={data.products}
      columns={columns}
      loading={loading}
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
        current: Number(router.query.page),
      }}
    />
  );
};

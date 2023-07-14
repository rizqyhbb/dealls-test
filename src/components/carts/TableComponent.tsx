import React from "react";
import { Box } from "../shared/Box";
import { Button, Table, Tag } from "antd";
import { useRouter } from "next/router";
import { ICart, ICarts } from "../../pages/carts";
import { Text } from "../shared/Text";
import styled from "@emotion/styled";
import { Card } from "../shared/Card";
import { Grid } from "../shared/Grid";
import { Flex } from "../shared/Flex";
import { TbDiscount2 } from "react-icons/tb";

const StyledTable = styled(Table)`
  .ant-table-content {
    overflow: auto;
  }
`;

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
      title: "Quantity",
      key: "id",
      render: (val: ICart) => {
        return (
          <Tag color="geekblue" bordered={false}>
            <Grid gridTemplateColumns={"max-content max-content"} gridGap={0}>
              <Text>Total product</Text>
              <Text>: {val.totalProducts}</Text>
              <Text>Quantity</Text>
              <Text>: {val.totalQuantity}</Text>
            </Grid>
          </Tag>
        );
      },
    },
    {
      title: "Total",
      key: "id",
      render: (val: ICart) => {
        return (
          <Box>
            <Text fontWeight={"bold"} color={"red"} textAlign={"end"}>
              ${val.total}.00
            </Text>
            <Flex alignItems={"center"} justifyContent={"end"}>
              <TbDiscount2 color="green" size={20} />
              <Text color={"green"} style={{ whiteSpace: "nowrap" }}>
                {(
                  ((val.total - val.discountedTotal) / val.total) *
                  100
                ).toFixed(2)}
                %
              </Text>
            </Flex>
          </Box>
        );
      },
    },
    {
      title: "Final Price",
      key: "id",
      render: (val: ICart) => {
        return (
          <Text fontWeight={"bold"} color={"green"} textAlign={"end"}>
            ${val.discountedTotal}.00
          </Text>
        );
      },
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
      <StyledTable
        loading={loading}
        dataSource={data?.carts}
        columns={columns}
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

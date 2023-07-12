import { Pagination, Table } from "antd";
import React, { FC } from "react";
import { columns } from "./helper";
import { Box } from "../shared/Box";
import { useRouter } from "next/router";

interface IProduct {
  [key: string]: string;
}

interface OwnProps {
  data: {
    products: IProduct[] | [];
    total: number;
  };
  loading: boolean;
}

export const TableComponent: FC<OwnProps> = ({ data, loading }) => {
  const router = useRouter();

  return (
    <Box>
      <Table
        dataSource={data.products}
        columns={columns}
        loading={loading}
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
    </Box>
  );
};

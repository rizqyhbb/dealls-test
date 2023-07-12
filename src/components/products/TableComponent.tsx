import { Pagination, Table } from "antd";
import React, { FC } from "react";
import { columns } from "./helper";
import { Box } from "../shared/Box";

interface IProduct {
  [key: string]: string;
}

interface OwnProps {
  data: {
    products: IProduct[] | [];
    total: number;
  };
  onPageChange: (page: number) => void;
  loading: boolean;
  currentPage: number;
}

export const TableComponent: FC<OwnProps> = ({
  currentPage,
  data,
  loading,
  onPageChange,
}) => {
  return (
    <Box>
      <Table
        dataSource={data.products}
        columns={columns}
        loading={loading}
        pagination={false}
      />
      <div>
        <Pagination
          total={data.total}
          showSizeChanger={false}
          onChange={(page) => onPageChange(page)}
          current={currentPage}
        />
      </div>
    </Box>
  );
};

import { Table } from "antd";
import React, { FC } from "react";
import { columns } from "./helper";

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
}

export const TableComponent: FC<OwnProps> = ({
  data,
  loading,
  onPageChange,
}) => {
  return (
    <Table
      dataSource={data.products}
      columns={columns}
      loading={loading}
      pagination={{
        total: data.total,
        showSizeChanger: false,
        onChange: (page) => onPageChange(page),
      }}
    />
  );
};

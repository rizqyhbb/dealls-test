import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Box } from "../../components/shared/Box";
import { TableComponent } from "../../components/carts/TableComponent";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { GetServerSideProps, NextPageContext } from "next";
import { message } from "antd";
import withAuth from "../../helper/withAuth";

export interface ICarts {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}

export interface ICart {
  id: number;
  products: IProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}
export default function Carts({ query }: any) {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page"));
  const limit = 10;
  const skip = limit * (page - 1);
  const apiUrl = process.env.NEXT_PUBLIC_API;

  const [messageApi, contextHolder] = message.useMessage();

  const {
    fire: getCarts,
    data,
    loading,
    status,
  } = useFetch<ICarts>(`${apiUrl}/carts?limit=${limit}&skip=${skip}`);

  const errorToast = (message?: string) => {
    messageApi.open({
      type: "error",
      content: message || "Something went wrong",
    });
  };

  useEffect(() => {
    if (query.page) return;
    router.push({
      pathname: router.pathname,
      query: { page: 1 },
    });
  }, []);

  useEffect(() => {
    getCarts();
  }, [page]);

  useEffect(() => {
    status === "error" && errorToast();
  }, [status]);

  return (
    <>
      {contextHolder}
      <Layout title="Cart List" journey={[{ title: "Carts" }]}>
        <TableComponent data={data!} loading={loading} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx) => {
  return {
    props: {
      query: ctx.query,
    },
  };
});

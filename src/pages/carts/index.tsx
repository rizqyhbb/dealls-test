import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Box } from "../../components/shared/Box";
import { TableComponent } from "../../components/carts/TableComponent";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { NextPageContext } from "next";

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

  const { fire: getCarts, data } = useFetch<ICarts>(
    `${apiUrl}/carts?limit=${limit}&skip=${skip}`
  );

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

  return (
    <Layout title="Cart List">
      <Box>
        <TableComponent data={data!} />
      </Box>
    </Layout>
  );
}

Carts.getInitialProps = async (ctx: NextPageContext) => {
  return { query: ctx.query };
};

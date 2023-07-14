import { NextPageContext } from "next";
import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { Box } from "../../../components/shared/Box";
import { Text } from "../../../components/shared/Text";
import { useFetch } from "../../../hooks/useFetch";
import { Flex } from "../../../components/shared/Flex";
import { Card } from "../../../components/shared/Card";
import { Grid } from "../../../components/shared/Grid";
import ItemCards from "../../../components/carts/ItemCards";
import TotalCard from "../../../components/carts/TotalCard";
import { CardSkeleton } from "../../../components/products/CardSkeleton";

export interface ICartData {
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
export default function DetaiLCart({ query }: any) {
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const { fire, data, loading } = useFetch<ICartData>(
    `${apiUrl}/carts/${query.id}`
  );

  useEffect(() => {
    fire();
  }, []);

  return (
    <Layout title="Cart Detail">
      {loading ? (
        <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap={3}>
          {Array.from(Array(10).keys()).map((val) => {
            return <CardSkeleton key={val} />;
          })}
        </Grid>
      ) : (
        <Box>
          <Card>
            <Text>Cart ID: {query.id}</Text>
            <Text>User ID: {data?.userId}</Text>
          </Card>
          <ItemCards data={data!} />
          <TotalCard data={data!} />
        </Box>
      )}
    </Layout>
  );
}

DetaiLCart.getInitialProps = async (ctx: NextPageContext) => {
  return { query: ctx.query };
};

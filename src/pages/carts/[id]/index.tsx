import { NextPageContext } from "next";
import React from "react";
import Layout from "../../../components/Layout";
import { Box } from "../../../components/shared/Box";
import { Text } from "../../../components/shared/Text";

export default function DetaiLCart({ query }: any) {
  return (
    <Layout>
      <Box>
        <Text color="black">DetaiLCart {query.id}</Text>
      </Box>
    </Layout>
  );
}

DetaiLCart.getInitialProps = async (ctx: NextPageContext) => {
  console.log("asdasdasdasd", ctx.query);
  return { query: ctx.query };
};

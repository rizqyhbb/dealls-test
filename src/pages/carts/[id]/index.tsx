import { NextPageContext } from "next";
import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { Box } from "../../../components/shared/Box";
import { Text } from "../../../components/shared/Text";
import { useFetch } from "../../../hooks/useFetch";
import { Flex } from "../../../components/shared/Flex";
import { Card } from "../../../components/shared/Card";
import { Grid } from "../../../components/shared/Grid";

interface CartData {
  id: number;
}
export default function DetaiLCart({ query }: any) {
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const { fire, data, loading } = useFetch(`${apiUrl}/carts/${query.id}`);

  useEffect(() => {
    fire();
  }, []);

  return (
    <Layout title="Cart Detail">
      {loading ? (
        <Text>Loading ...</Text>
      ) : (
        <Box>
          <Box bg={"grey"} px={3} width={"fit-content"} borderRadius={"4px"}>
            <Text>Cart ID: {query.id}</Text>
            <Text>User ID: {data?.userId}</Text>
          </Box>

          <Grid gridTemplateColumns={"1fr 1fr"}>
            {data?.products.map((product, idx) => (
              <Card key={product.id}>
                <Text>Item no {idx + 1}</Text>
                <Text fontWeight={"bold"}>{product.title}</Text>
                <Flex justifyContent={"space-between"}>
                  <Flex>
                    <Text>
                      ${product.price} x {product.quantity}
                    </Text>
                  </Flex>
                  <Text fontWeight={"bold"}>${product.total}</Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Flex>
                    <Text>Discount</Text>
                  </Flex>
                  <Text fontWeight={"bold"} color={"green"}>
                    {product.discountPercentage}%
                  </Text>
                </Flex>
                <Box width={"100%"} height={"1px"} bg={"grey"} my={2} />
                <Flex justifyContent={"space-between"}>
                  <Flex>
                    <Text fontWeight={"bold"}>TOTAL</Text>
                  </Flex>
                  <Text fontWeight={"bold"} color={"green"}>
                    ${product.discountedPrice}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Grid>
          <Card>
            <Grid gridTemplateColumns={"1fr 1fr"}>
              <Text fontWeight={"bold"}>Total products</Text>
              <Text textAlign={"end"} fontWeight={"bold"}>
                {data?.totalProducts}
              </Text>

              <Text fontWeight={"bold"}>Total quantity</Text>
              <Text textAlign={"end"} fontWeight={"bold"}>
                {data?.totalQuantity}
              </Text>

              <Text fontWeight={"bold"}>Total price</Text>
              <Text textAlign={"end"} fontWeight={"bold"} color={"red"}>
                ${data?.total}
              </Text>

              <Text fontWeight={"bold"}>Total discount</Text>
              <Text textAlign={"end"} fontWeight={"bold"} color={"green"}>
                ${data?.total - data?.discountedTotal}
              </Text>
            </Grid>
            <Box width={"100%"} height={"1px"} bg={"grey"} my={2} />
            <Grid gridTemplateColumns={"1fr 1fr"}>
              <Text fontWeight={"bold"}>FINAL PRICE</Text>
              <Text textAlign={"end"} fontWeight={"bold"} color={"green"}>
                ${data?.discountedTotal}
              </Text>
            </Grid>
          </Card>
        </Box>
      )}
    </Layout>
  );
}

DetaiLCart.getInitialProps = async (ctx: NextPageContext) => {
  return { query: ctx.query };
};

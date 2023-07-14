import React from "react";
import { ICartData, IProduct } from "../../pages/carts/[id]";
import { Grid } from "../shared/Grid";
import { Card } from "../shared/Card";
import { Text } from "../shared/Text";
import { Flex } from "../shared/Flex";
import { Box } from "../shared/Box";

const ItemCards = ({ data }: { data: ICartData }) => {
  return (
    <>
      <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap={3}>
        {data?.products.map((product: IProduct, idx: number) => (
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
    </>
  );
};

export default ItemCards;

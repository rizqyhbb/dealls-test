import React from "react";
import { ICartData, IProduct } from "../../pages/carts/[id]";
import { Grid } from "../shared/Grid";
import { Card } from "../shared/Card";
import { Text } from "../shared/Text";
import { Flex } from "../shared/Flex";
import { Box } from "../shared/Box";
import { Tag } from "antd";
import { TbDiscount2 } from "react-icons/tb";

const ItemCards = ({ data }: { data: ICartData }) => {
  return (
    <>
      <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap={3}>
        {data?.products.map((product: IProduct, idx: number) => (
          <Card key={product.id}>
            <Tag bordered={false} color="orange">
              Item no {idx + 1}
            </Tag>
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
              <Flex alignItems={"center"}>
                <TbDiscount2 color="green" size={20} />
                <Text fontWeight={"bold"} color={"green"}>
                  {product.discountPercentage}%
                </Text>
              </Flex>
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

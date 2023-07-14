import React from "react";
import { ICartData, IProduct } from "../../pages/carts/[id]";
import { Grid } from "../shared/Grid";
import { Card } from "../shared/Card";
import { Text } from "../shared/Text";
import { Flex } from "../shared/Flex";
import { Box } from "../shared/Box";

const TotalCard = ({ data }: { data: ICartData }) => {
  return (
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
          ${data?.total! - data?.discountedTotal!}
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
  );
};

export default TotalCard;

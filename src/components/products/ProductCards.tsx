import React, { FC } from "react";
import { OwnProps as TableComponentProps } from "./TableComponent";
import { Card } from "../shared/Card";
import { Text } from "../shared/Text";
import { Flex } from "../shared/Flex";
import { Tag } from "antd";
import { TbDiscount2, TbStarFilled } from "react-icons/tb";
import { useAtom } from "jotai";
import { productsAtom } from "../../context/productContext";

interface OwnProps extends TableComponentProps {}
const ProductCards: FC<OwnProps> = () => {
  const [data, setData] = useAtom(productsAtom);
  if (data.loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      {data.products.map((product) => (
        <Card key={product.id}>
          <Tag color="success" bordered={false}>
            ID {product.id}
          </Tag>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontWeight={"bold"} fontSize={2}>
              {product.title}
            </Text>
            <Text color={"grey"}>Stock: {product.stock}</Text>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text>{product.brand}</Text>
            <Tag bordered={false} color="blue" style={{ marginRight: "0px" }}>
              {product.category}
            </Tag>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <TbStarFilled color="yellow" size={20} />
              <Text fontWeight={"bold"}>{product.rating}</Text>
            </Flex>
            <Text fontWeight={"bold"}>${product.price}.00</Text>
          </Flex>
          <Flex alignItems={"center"} justifyContent={"end"}>
            <TbDiscount2 color="green" size={20} />
            <Text color={"green"} fontWeight={"bold"}>
              {product.discountPercentage}%
            </Text>
          </Flex>
          <hr />
          <Text>{product.description}</Text>
        </Card>
      ))}
    </>
  );
};

export default ProductCards;

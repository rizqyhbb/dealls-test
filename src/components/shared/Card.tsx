import React, { FC, ReactNode } from "react";
import { Box, IBox } from "./Box";

interface ICard {
  children: ReactNode;
}

export const Card: FC<ICard> = ({ children }) => {
  return (
    <Box
      borderRadius={"8px"}
      py={2}
      px={3}
      mb={2}
      boxShadow={"0px 10px 15px -3px rgba(0,0,0,0.1)"}
      bg="white"
    >
      {children}
    </Box>
  );
};

import React, { FC, ReactNode } from "react";
import { Box } from "./Box";

export const Card: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      borderRadius={"8px"}
      py={2}
      px={3}
      mb={2}
      boxShadow={"0px 10px 15px -3px rgba(0,0,0,0.1)"}
    >
      {children}
    </Box>
  );
};

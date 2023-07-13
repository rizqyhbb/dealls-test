import React from "react";
import { Box } from "./Box";
import { Button } from "antd";
import { Flex } from "./Flex";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export const Pagination = ({
  onPageChange,
  currentPage = 1,
  total = 1,
  size = 10,
}: {
  onPageChange?: (page: number) => void;
  currentPage?: number;
  total?: number;
  size?: number;
}) => {
  const pageCount = Math.ceil(total / size);

  console.log(pageCount);

  return (
    <Flex>
      {pageCount > 0 && (
        <ul>
          <Flex flexWrap={"wrap"}>
            <Button type="ghost" shape="circle">
              <Flex justifyContent={"center"} alignItems={"center"}>
                <AiOutlineLeft size={16} />
              </Flex>
            </Button>
            {Array.from(Array(pageCount).keys()).map((count) => {
              const pageCount = count + 1;
              return (
                <Box key={count} m={1}>
                  <Button
                    type={currentPage === pageCount ? "primary" : undefined}
                    shape="circle"
                    onClick={() => onPageChange && onPageChange(pageCount)}
                  >
                    {pageCount}
                  </Button>
                </Box>
              );
            })}
            <Button type="ghost" shape="circle">
              <Flex justifyContent={"center"} alignItems={"center"}>
                <AiOutlineRight size={16} />
              </Flex>
            </Button>
          </Flex>
        </ul>
      )}
    </Flex>
  );
};

import React, { useEffect, useState } from "react";
import { Box } from "../shared/Box";
import { Button, Slider } from "antd";
import { Flex } from "../shared/Flex";
import { useFetch } from "../../hooks/useFetch";
import { IProduct, IResponse } from "../../context/productContext";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const PriceSlider = ({ onApply }: { onApply?: () => void }) => {
  const router = useRouter();
  const params = useSearchParams();
  const minPrice = Number(params.get("min_price"));
  const maxPrice = Number(params.get("max_price"));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 200]);
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const {
    fire: getPriceRange,
    data,
    loading,
  } = useFetch(`${apiUrl}/products?limit=0&skip=0&select=price`);

  useEffect(() => {
    getPriceRange();
  }, []);

  useEffect(() => {
    if (typeof minPrice === "number" && typeof maxPrice === "number")
      setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (!data) return;
    const mappedPriceRange = (data as IResponse).products
      .map((val) => val.price)
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    setRangeValue([
      mappedPriceRange[0],
      mappedPriceRange[mappedPriceRange.length - 1],
    ]);
  }, [data]);

  const handleFilterPrice = (isClear: boolean) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 1,
        min_price: isClear ? undefined : priceRange[0],
        max_price: isClear ? undefined : priceRange[1],
      },
    });

    onApply && onApply();
  };
  return (
    <Box>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Box px={3} width={"100%"}>
            <Slider
              max={rangeValue[1]}
              min={rangeValue[0]}
              marks={{
                [rangeValue[0]]: `$${rangeValue[0]}`,
                [rangeValue[1]]: `$${rangeValue[1]}`,
              }}
              tooltip={{ formatter: (val) => `$${val}.00` }}
              range
              defaultValue={priceRange}
              onAfterChange={(val) => setPriceRange(val)}
            />
          </Box>
          <Flex justifyContent={"end"}>
            <Button size="small" onClick={() => handleFilterPrice(true)}>
              clear
            </Button>
            <Box ml={1}>
              <Button
                size="small"
                type="primary"
                onClick={() => handleFilterPrice(false)}
              >
                Apply
              </Button>
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default PriceSlider;

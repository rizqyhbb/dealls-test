import React, { FC, useEffect, useState } from "react";
import { Button, Input, Popover, Select } from "antd";
import { Flex } from "../shared/Flex";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import PriceSlider from "./PriceSlider";
import { Text } from "../shared/Text";
import { Box } from "../shared/Box";

export interface IBrand {
  id: number;
  brand: string;
}

interface IProducts {
  products: IBrand[];
}
interface IFilterTab {
  categories: string[];
  brands: IProducts | [];
}

const FilterTab: FC<IFilterTab> = ({ categories, brands = [] }) => {
  const router = useRouter();
  const params = useSearchParams();
  const minPrice = params.get("min_price");
  const maxPrice = params.get("max_price");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  useEffect(() => {
    setSearchQuery(params.get("search") as string);
  }, [params]);

  const pushRoute = (query: { [key: string]: string | number }) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...query },
    });
  };

  const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const search = (e.target as HTMLInputElement).value;
      pushRoute({
        search,
        page: 1,
      });
    }
  };

  const handleSelectCategory = (value: string) => {
    pushRoute({
      search: "",
      page: 1,
      category: value,
    });
  };

  const handleSelectBrand = (value: string) => {
    pushRoute({
      search: "",
      page: 1,
      brand: value,
    });
  };

  const options = categories.sort().map((category) => ({
    value: category,
    label: category,
  }));

  // handle this with useEffect ==========
  const brandsAsArray =
    brands &&
    (brands as IProducts).products &&
    Array.from(
      new Set((brands as IProducts).products?.map((prod) => prod.brand))
    );

  const brandOptions: any =
    brandsAsArray &&
    brandsAsArray.length > 0 &&
    brandsAsArray.map((prod) => ({
      value: prod,
      label: prod.toUpperCase(),
    }));
  // handle this with useEffect ==========

  return (
    <Flex>
      <Box width={"100%"}>
        <Text fontStyle={"italic"} color={"grey"}>
          Search product
        </Text>
        <Input
          placeholder="Search by product name"
          onKeyDown={handleSearch}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <Box ml={2}>
        <Text fontStyle={"italic"} color={"grey"}>
          Filter by brand
        </Text>
        <Select
          allowClear
          value={params.get("brand") || undefined}
          style={{ width: "200px" }}
          options={brandOptions}
          placeholder={"No filter"}
          onChange={handleSelectBrand}
        />
      </Box>

      <Box ml={2}>
        <Text fontStyle={"italic"} color={"grey"}>
          Filter by category
        </Text>
        <Select
          allowClear
          value={params.get("category") || undefined}
          style={{ width: "200px" }}
          options={options}
          placeholder={"No filter"}
          onChange={handleSelectCategory}
        />
      </Box>
      <Box ml={2} minWidth={120}>
        <Text fontStyle={"italic"} color={"grey"}>
          Filter by price
        </Text>
        <Popover
          placement="bottomRight"
          content={<PriceSlider onApply={() => setShowPriceFilter(false)} />}
          title={"Filter price"}
          trigger={"click"}
          open={showPriceFilter}
        >
          <Button onClick={() => setShowPriceFilter(true)} block>
            <Flex justifyContent={"start"}>
              {minPrice && maxPrice
                ? `$${minPrice} - $${maxPrice}`
                : "No filter"}{" "}
            </Flex>
          </Button>
        </Popover>
      </Box>
    </Flex>
  );
};

export default FilterTab;

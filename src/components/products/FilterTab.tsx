import React, { FC, useEffect, useState } from "react";
import { Button, Input, Popover, Select } from "antd";
import { Flex } from "../shared/Flex";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import PriceSlider from "./PriceSlider";
import { Text } from "../shared/Text";
import { Box } from "../shared/Box";
import { Grid } from "../shared/Grid";
import { produce } from "immer";
import { IBrands } from "../../pages/products";

interface OwnProps {
  categories: string[];
  brands: IBrands;
}

const FilterTab: FC<OwnProps> = ({ categories, brands }) => {
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

  const options = categories?.sort().map((category) => ({
    value: category,
    label: category,
  }));

  const brandsAsArray = Array.from(
    new Set(brands?.products?.map((prod) => prod.brand))
  );

  const brandOptions = brandsAsArray.map((prod) => ({
    value: prod,
    label: prod.toUpperCase(),
  }));

  return (
    <Flex flexDirection={["column", "row"]}>
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

      <Grid gridTemplateColumns={"1fr 1fr"} gridGap={[3, 0]}>
        <Box ml={[0, 2]} width={["100%", 140]}>
          <Text fontStyle={"italic"} color={"grey"}>
            Filter by brand
          </Text>
          <Select
            allowClear
            value={params.get("brand") || undefined}
            style={{ width: "100%" }}
            options={brandOptions}
            placeholder={"No filter"}
            onChange={handleSelectBrand}
          />
        </Box>

        <Box ml={[0, 2]} width={["100%", 140]}>
          <Text fontStyle={"italic"} color={"grey"}>
            Filter by category
          </Text>
          <Select
            allowClear
            style={{ width: "100%" }}
            value={params.get("category") || undefined}
            options={options}
            placeholder={"No filter"}
            onChange={handleSelectCategory}
          />
        </Box>
      </Grid>

      <Box ml={[0, 2]} minWidth={120}>
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

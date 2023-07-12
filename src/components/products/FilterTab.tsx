import React, { FC } from "react";
import { Text } from "../shared/Text";
import { Checkbox, Input, Select } from "antd";
import { Flex } from "../shared/Flex";
import { useRouter } from "next/router";
import { Box } from "../shared/Box";

export interface IBrand {
  id: number;
  brand: string;
}
interface IFilterTab {
  categories: string[];
  brands: {
    products: IBrand[];
  };
}

const FilterTab: FC<IFilterTab> = ({ categories, brands = [] }) => {
  const router = useRouter();

  const pushRoute = (query) => {
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
    label: category.toUpperCase(),
  }));

  const brandsAsArray =
    brands &&
    brands.products &&
    Array.from(new Set(brands?.products?.map((prod) => prod.brand)));

  const brandOptions =
    brandsAsArray &&
    brandsAsArray.length > 0 &&
    brandsAsArray.map((prod) => ({
      value: prod,
      label: prod.toUpperCase(),
    }));

  return (
    <Flex>
      <Box>
        <Select
          style={{ width: "200px" }}
          options={brandOptions}
          placeholder={"Brand"}
          onChange={handleSelectBrand}
        />

        <Select
          style={{ width: "200px" }}
          options={options}
          placeholder={"Category"}
          onChange={handleSelectCategory}
        />
      </Box>
      <Input placeholder="Search" onKeyDown={handleSearch} />
    </Flex>
  );
};

export default FilterTab;

import React, { useEffect, useState } from "react";
import { Box } from "../../components/shared/Box";
import { TableComponent } from "../../components/products/TableComponent";
import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/useFetch";
import { useParams, useSearchParams } from "next/navigation";
import FilterTab, { IBrand } from "../../components/products/FilterTab";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

export default function Products({ query }: any) {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get("page"));
  const search = params.get("search");
  const category = params.get("category");
  const limit = 10;
  const skip = limit * (page - 1);
  const apiUrl = process.env.NEXT_PUBLIC_API;

  const {
    fire: getProducts,
    loading: isLoading,
    data,
  } = useFetch(
    category
      ? `${apiUrl}/products/category/${category}?limit=${limit}&skip=${skip}`
      : `${apiUrl}/products/search?q=${search}&limit=${limit}&skip=${skip}`
  );

  const {
    fire: getCategories,
    loading: loadingCategories,
    data: categoriesData,
  } = useFetch(`${apiUrl}/products/categories`);

  const {
    fire: getBrand,
    loading: loadingBrand,
    data: brandData,
  } = useFetch(`${apiUrl}/products?limit=0&skip=0&select=brand`);

  useEffect(() => {
    getCategories();
    getBrand();
    if (
      query.page &&
      query.search !== undefined &&
      query.category !== undefined
    )
      return;
    router.push({
      pathname: router.pathname,
      query: { page: 1, search: "" },
    });
  }, []);

  useEffect(() => {
    getProducts();
  }, [page, search, category]);

  return (
    <Layout>
      <Box>
        <FilterTab categories={categoriesData || []} brands={brandData || []} />
        <TableComponent data={data || []} loading={isLoading} />
      </Box>
    </Layout>
  );
}

Products.getInitialProps = async (ctx: NextPageContext) => {
  return { query: ctx.query };
};

import React, { useEffect } from "react";
import { Box } from "../../components/shared/Box";
import { TableComponent } from "../../components/products/TableComponent";
import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/useFetch";
import { useSearchParams } from "next/navigation";
import FilterTab from "../../components/products/FilterTab";
import { useRouter } from "next/router";
import ProductCards from "../../components/products/ProductCards";
import { useAtom } from "jotai";
import { IProduct, productsAtom } from "../../context/productContext";
import axios, { AxiosError } from "axios";
import { NextPageContext } from "next";

export interface IBrands {
  products: IProductOnBrands[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductOnBrands {
  id: number;
  brand: string;
}

export default function Products({ query }: any) {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");
  const category = params.get("category");
  const brand = params.get("brand");
  const minPrice = Number(params.get("min_price"));
  const maxPrice = Number(params.get("max_price"));
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const [_, setProductsState] = useAtom(productsAtom);

  const {
    fire: getCategories,
    loading: loadingCategories,
    data: categoriesData,
  } = useFetch<string[]>(`${apiUrl}/products/categories`);

  const {
    fire: getBrand,
    loading: loadingBrand,
    data: brands,
  } = useFetch<IBrands>(`${apiUrl}/products?limit=0&skip=0&select=brand`);

  const getProductsData = async ({
    search = "",
    category = "",
    brand = "",
    price = null,
  }: {
    search?: string | null;
    category?: string | null;
    brand?: string | null;
    price?: {
      minPrice: number;
      maxPrice: number;
    } | null;
  }) => {
    try {
      setProductsState((draft) => {
        draft.loading = true;
      });
      const res = await axios.get(`${apiUrl}/products/?limit=0&skip=0`);

      let newProducts: IProduct[] = res.data.products;

      if (search) {
        newProducts = newProducts.filter((prod) =>
          prod.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category) {
        newProducts = newProducts.filter(
          (product) => product.category === category
        );
      }

      if (brand) {
        newProducts = newProducts.filter((product) => product.brand === brand);
      }

      if (price?.maxPrice && price?.maxPrice !== 0) {
        newProducts = newProducts.filter(
          (product) =>
            product.price >= price.minPrice && product.price <= price.maxPrice
        );
      }

      setProductsState({
        products: newProducts,
        limit: 10,
        loading: false,
        skip: 0,
        total: newProducts.length,
      });
    } catch (err) {
      alert((err as AxiosError).response?.status);
    } finally {
      setProductsState((draft) => {
        draft.loading = false;
      });
    }
  };

  useEffect(() => {
    getCategories();
    getBrand();
  }, []);

  useEffect(() => {
    if (query.page) return;
    router.push({
      pathname: router.pathname,
      query: { page: 1, search: "" },
    });
  }, [query]);

  useEffect(() => {
    getProductsData({ search, category, brand, price: { minPrice, maxPrice } });
  }, [search, category, brand, minPrice, maxPrice]);

  return (
    <Layout title="Product List" journey={[{ title: "Products" }]}>
      <Box>
        <FilterTab categories={categoriesData!} brands={brands!} />
        <Box mt={3} display={["none", "block"]}>
          <TableComponent />
        </Box>
        <Box mt={3} display={["block", "none"]}>
          <ProductCards />
        </Box>
      </Box>
    </Layout>
  );
}

Products.getInitialProps = async (ctx: NextPageContext) => {
  return {
    query: ctx.query,
  };
};

import React, { useEffect, useState } from "react";
import { Box } from "../../components/shared/Box";
import { TableComponent } from "../../components/products/TableComponent";
import Layout from "../../components/Layout";
import { useFetch } from "../../hooks/useFetch";

const Products = () => {
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const {
    fire: getProducts,
    loading: isLoading,
    data,
  } = useFetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

  useEffect(() => {
    getProducts();
  }, [limit, skip]);

  return (
    <Layout>
      <Box>
        <TableComponent
          data={data || []}
          loading={isLoading}
          onPageChange={(page) => {
            setSkip((page - 1) * limit);
          }}
          currentPage={skip + limit / limit}
        />
      </Box>
    </Layout>
  );
};

export default Products;

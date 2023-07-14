import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useFetch } from "../../hooks/useFetch";
import { Text } from "../../components/shared/Text";
import { Grid } from "../../components/shared/Grid";
import { Box } from "../../components/shared/Box";
import { Card } from "../../components/shared/Card";

interface IResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface IProduct {
  id: number;
  title: string;
  stock: number;
  category: string;
}

const Dashboard = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API;
  const {
    fire,
    data: fetchData,
    loading,
  } = useFetch<IResponse>(
    `${apiUrl}/products?limit=0&skip=0&select=title,stock,category`
  );

  const {
    fire: fetchProductCategory,
    data: productCategoryData,
    loading: productCategoryLoading,
  } = useFetch<string[]>(`${apiUrl}/products/categories`);

  useEffect(() => {
    fire();
    fetchProductCategory();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = fetchData?.products.map((product) => product.title);

  const dataSource = {
    // labels,
    datasets: [
      {
        data: fetchData?.products.map((product) => ({
          x: product.title,
          y: product.stock,
        })),
      },
    ],
  };

  const randomizeColor = (num: number) =>
    `#${Math.floor(Math.random() * (16777216 + num)).toString(16)}`;

  return (
    <Layout title="Dashboard" journey={[{ title: "Dashboard" }]}>
      {loading || productCategoryLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Grid
          gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
          gridGap={3}
        >
          {productCategoryData?.map((category, idx) => (
            <Box key={category}>
              <Card>
                <Bar
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: category.toUpperCase(),
                      },
                    },
                  }}
                  data={{
                    datasets: [
                      {
                        label: category,
                        data: fetchData?.products
                          .filter((product) => product.category === category)
                          .map((product) => ({
                            x: product.title,
                            y: product.stock,
                          })),
                        backgroundColor: randomizeColor(idx),
                      },
                    ],
                  }}
                />
              </Card>
            </Box>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Dashboard;

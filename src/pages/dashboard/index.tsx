import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import * as cookie from "cookie";
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
import { message } from "antd";
import { CardSkeleton } from "../../components/products/CardSkeleton";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import withAuth from "../../helper/withAuth";

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
  const [messageApi, contextHolder] = message.useMessage();

  const {
    fire,
    data: fetchData,
    loading,
    status,
  } = useFetch<IResponse>(
    `${apiUrl}/products?limit=0&skip=0&select=title,stock,category`
  );

  const {
    fire: fetchProductCategory,
    data: productCategoryData,
    loading: productCategoryLoading,
    status: productCategoryStatus,
  } = useFetch<string[]>(`${apiUrl}/products/categories`);

  const errorToast = (message?: string) => {
    messageApi.open({
      type: "error",
      content: message || "Something went wrong",
    });
  };

  useEffect(() => {
    fire();
    fetchProductCategory();
  }, []);

  useEffect(() => {
    status === "error" && errorToast();
    productCategoryStatus === "error" && errorToast();
  }, [status, productCategoryStatus]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const randomizeColor = (num: number) =>
    `#${Math.floor(Math.random() * (16777216 + num)).toString(16)}`;

  return (
    <>
      {contextHolder}
      <Layout title="Dashboard" journey={[{ title: "Dashboard" }]}>
        <Grid
          gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
          gridGap={3}
        >
          {loading || productCategoryLoading ? (
            <>
              {Array.from(Array(10).keys()).map((val) => (
                <CardSkeleton key={val} />
              ))}
            </>
          ) : (
            <>
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
                              .filter(
                                (product) => product.category === category
                              )
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
            </>
          )}
        </Grid>
      </Layout>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  return {
    props: {},
  };
});

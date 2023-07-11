import type { NextPage } from "next";
import { Table } from "antd";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Table />
    </Layout>
  );
};

export default Home;

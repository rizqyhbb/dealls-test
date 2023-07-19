import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import * as cookie from "cookie";

const withAuth = (getServerSidePropsFunction: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    const isAuthenticated = Boolean(req.cookies.auth);

    if (isAuthenticated && req.url?.includes("/signin")) {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard",
        },
      };
    }

    if (!isAuthenticated && !req.url?.includes("/signin")) {
      return {
        redirect: {
          permanent: false,
          destination: "/signin",
        },
      };
    }
    return await getServerSidePropsFunction(ctx);
  };
};

export default withAuth;

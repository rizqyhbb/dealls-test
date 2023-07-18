import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import * as cookie from "cookie";

const withAuth = (getServerSidePropsFunction: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.headers.cookie) {
      const cookies = cookie.parse(req.headers.cookie);
      const currentAuth = cookies.auth;

      if (currentAuth && req.url?.includes("/signin")) {
        return {
          redirect: {
            permanent: false,
            destination: "/dashboard",
          },
        };
      }

      if (!currentAuth && !req.url?.includes("/signin")) {
        return {
          redirect: {
            permanent: false,
            destination: "/signin",
          },
        };
      }
    }
    return await getServerSidePropsFunction(ctx);
  };
};

export default withAuth;

import axiosFetch from "axios";

const axios = axiosFetch.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export default axios;

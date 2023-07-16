import { useState } from "react";
import axios from "../helper/axios";
import { AxiosError, AxiosRequestConfig } from "axios";

interface FetchOptions {
  method?: string;
  body?: BodyInit;
  headers?: HeadersInit;
}

interface FetchResult<T> {
  loading: boolean;
  data: T | null;
  error: any;
  status: "idle" | "loading" | "success" | "error";
  fire: (options?: AxiosRequestConfig) => Promise<void>;
}

export const useFetch = <T>(
  url: string,
  options: AxiosRequestConfig = {}
): FetchResult<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fire = async (fireOptions?: AxiosRequestConfig): Promise<void> => {
    const fetchOptions = {
      ...options,
      ...fireOptions,
    };

    try {
      setStatus("idle");
      setLoading(true);
      const response = await axios(url, fetchOptions);

      if (response.status === 200) {
        setData(response.data);
        setStatus("success");
      } else {
        setError(response.data);
        setStatus("error");
      }
    } catch (error: unknown) {
      setError((error as AxiosError).response?.data);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, status, error, fire };
};

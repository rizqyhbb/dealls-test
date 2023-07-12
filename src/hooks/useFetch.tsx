import { useState } from "react";

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
  fire: () => Promise<void>;
}

export const useFetch = (url: string, options: FetchOptions = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fire = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const jsonData = await response.json();

      if (response.ok) {
        setData(jsonData);
        setStatus("success");
        setLoading(false);
      } else {
        setError(jsonData);
        setStatus("error");
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setStatus("error");
      setLoading(false);
    }
  };

  return { loading, data, status, error, fire };
};

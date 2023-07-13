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

export const useFetch = <T>(
  url: string,
  options: FetchOptions = {}
): FetchResult<T> => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fire = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      const jsonData: T = await response.json();

      if (response.ok) {
        setData(jsonData);
        setStatus("success");
      } else {
        setError(jsonData);
        setStatus("error");
      }
    } catch (error) {
      setError(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, status, error, fire };
};

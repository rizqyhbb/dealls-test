import { useState } from "react";

interface FetchOptions {
  method?: string;
  body?: BodyInit;
  headers?: HeadersInit;
}

export const useFetch = (url: string, options: FetchOptions = {}) => {
  const [loading, setLoading] = useState(false);
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

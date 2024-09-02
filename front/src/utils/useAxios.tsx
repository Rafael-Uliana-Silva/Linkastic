import React from "react";
import axios, { AxiosRequestConfig } from "axios";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function useAxios<T>(
  url: string,
  options?: AxiosRequestConfig,
  delay: number = 0 
): FetchState<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setData(null);
      try {
        await sleep(delay);
        const response = await axios.get<T>(url, {
          ...optionsRef.current,
          cancelToken: source.token,
        });
        setData(response.data);
      } catch (error) {
        if (!axios.isCancel(error) && error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [url, delay]);

  return { data, loading, error };
}

export default useAxios;

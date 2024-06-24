import { useEffect, useState } from "react";
import { AppState } from "../Redux/AppState";
import { useSelector } from "react-redux";

export const useFetch = <T>(
  fnQuery: () => Promise<T>,
  selector?: (appState: AppState) => T
): { result: T | null; isLoading: boolean } => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const reduxData = useSelector(selector ?? (() => null));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selector && reduxData !== null) {
          setResult(reduxData);
        } else {
          const data = await fnQuery();
          setResult(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fnQuery, selector, reduxData]);

  return { result, isLoading };
};

import { useEffect, useState } from "react";

export function useFetch({ FetchFn, initialValue }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetchUserPlaces() {
      setIsLoading(true);
      try {
        const data = await FetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message,
        });
      }
      setIsLoading(false);
    }
    fetchUserPlaces();
  }, [FetchFn]);

  return {
    isLoading,
    error,
    fetchedData,
    setFetchedData,
  };
}

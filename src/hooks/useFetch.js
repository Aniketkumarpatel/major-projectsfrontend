import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';

/**
 * useFetch – generic data fetching hook.
 *
 * @param {string} url - API endpoint
 * @param {object} [params] - Query parameters
 * @returns {{ data, isLoading, error, refetch }}
 */
const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchFlag, setRefetchFlag] = useState(0);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(url, { params });
        if (!cancelled) setData(response.data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refetchFlag]);

  const refetch = () => setRefetchFlag((f) => f + 1);

  return { data, isLoading, error, refetch };
};

export default useFetch;

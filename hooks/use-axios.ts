import { useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '@/lib/axiosInstance';

interface UseAxiosState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAxiosReturn<T> extends UseAxiosState<T> {
  request: (config: AxiosRequestConfig) => Promise<T | null>;
  reset: () => void;
}

function useAxios<T = unknown>(): UseAxiosReturn<T> {
  const [state, setState] = useState<UseAxiosState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (config: AxiosRequestConfig): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });
      try {
        const response: AxiosResponse<T> = await axiosInstance(config);
        setState({ data: response.data, loading: false, error: null });
        return response.data;
      } catch (err: unknown) {
        const message =
          (err as { response?: { data?: { message?: string }; statusText?: string } })
            ?.response?.data?.message ||
          (err as { message?: string })?.message ||
          'Something went wrong';
        setState({ data: null, loading: false, error: message });
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, request, reset };
}

export default useAxios;

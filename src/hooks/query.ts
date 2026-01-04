import { MutationOptions } from '@/types/query';
import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiErrorResponse } from './auth';

/**
 * Enhanced useMutation hook that works with our Axios API functions
 * Automatically extracts data from AxiosResponse and provides proper typing
 */
export function useApiMutation<TData = any, TParams = any>(
  mutationFn: (params: TParams) => Promise<AxiosResponse<TData>>,
  options?: MutationOptions<TData, AxiosError<ApiErrorResponse>, TParams>,
) {
  return useMutation({
    mutationFn,
    ...options,
  });
}

export function useApiQuery<
  TQueryFnData = unknown,
  TError = AxiosError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  return useQuery(options);
}

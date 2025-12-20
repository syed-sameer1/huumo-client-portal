import { MutationOptions } from '@/types/query';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

/**
 * Enhanced useMutation hook that works with our Axios API functions
 * Automatically extracts data from AxiosResponse and provides proper typing
 */
export function useApiMutation<TData = any, TError = Error, TParams = any>(
  mutationFn: (params: TParams) => Promise<AxiosResponse<TData>>,
  options?: MutationOptions<TData, TError, TParams>,
) {
  return useMutation({
    mutationFn,
    ...options,
  });
}

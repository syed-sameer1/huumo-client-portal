import { AxiosResponse } from 'axios';
import { UseMutationOptions } from '@tanstack/react-query';

// Enhanced mutation options that work with our axios responses
export type MutationOptions<TData = any, TError = Error, TParams = any> = Omit<
  UseMutationOptions<AxiosResponse<TData>, TError, TParams>,
  'mutationFn'
>;

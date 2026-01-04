import { createSubscription } from '@/service/subscriptionPackages';
import { useApiMutation } from './query';
import { AxiosError } from 'axios';
import { ApiErrorResponse } from './auth';
import { MutationOptions } from '@tanstack/react-query';

export const useCreateSubscription = (
  options?: MutationOptions<
    { url: string },
    AxiosError<ApiErrorResponse>,
    { planId: number }
  >,
) => {
  return useApiMutation(createSubscription, options);
};

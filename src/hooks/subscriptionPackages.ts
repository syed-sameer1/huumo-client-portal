import {
  createSubscription,
  CreateSubscriptionResponse,
} from '@/service/subscriptionPackages';
import { useApiMutation } from './query';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiErrorResponse } from './auth';
import { MutationOptions } from '@tanstack/react-query';

export const useCreateSubscription = (
  options?: MutationOptions<
    AxiosResponse<CreateSubscriptionResponse>,
    AxiosError<ApiErrorResponse>,
    { planId: number }
  >,
) => {
  return useApiMutation(createSubscription, options);
};

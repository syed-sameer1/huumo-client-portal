import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';

export interface CreateSubscriptionResponse {
  url: string;
}

export const createSubscription = ({
  planId,
}: {
  planId: number;
}): Promise<AxiosResponse<CreateSubscriptionResponse>> =>
  api.post(urls.createSubscription, { planId });

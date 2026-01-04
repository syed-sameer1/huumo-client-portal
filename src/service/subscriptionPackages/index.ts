import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';

interface CreateSubscriptionResponae {
  url: string;
}

export const createSubscription = ({
  planId,
}: {
  planId: number;
}): Promise<AxiosResponse<CreateSubscriptionResponae>> =>
  api.post(urls.createSubscription, { planId });

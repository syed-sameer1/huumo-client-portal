import { urls } from '@/constants/urls';
import { api } from '../api';

export const billingSubscriptionStatus = () => api.get(urls.subscriptionStatus);

import { urls } from '@/constants/urls';
import { api } from '../api';

export const activateClient = (payload: any) =>
  api.post(urls.clientActivate, payload);

export const updateFollowUpFrequency = (payload: any) =>
  api.patch(urls.updateFollowUpFrequency, payload);

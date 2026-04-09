import { urls } from '@/constants/urls';
import { api } from '../api';

export const activateClient = (payload: any) =>
  api.post(urls.userActivate, payload);

export const updateFollowUpFrequency = (payload: any) =>
  api.patch(urls.updateFollowUpFrequency, payload);

export const createUser = (payload: any) => api.post(urls.user, payload);

export const clientSettings = () => api.get(urls.settings);

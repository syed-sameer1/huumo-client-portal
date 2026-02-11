import { urls } from '@/constants/urls';
import { api } from '../api';

export const gmailIntegration = async () => {
  const { data } = await api.get(urls.gmailConnect);
  return data;
};

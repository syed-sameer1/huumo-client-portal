import { urls } from '@/constants/urls';
import { api } from '../api';

export const mappingSubmit = (payload: any) => api.post(urls.mapping, payload);

export const vendorMappingSubmit = (payload: any) =>
  api.post(urls.vendorMapping, payload);

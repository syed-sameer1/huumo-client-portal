import { urls } from '@/constants/urls';
import { api } from '../api';

export const importCSV = (payload: any) => api.post(urls.importCSV, payload);

export const importVendorCSV = (payload: any) =>
  api.post(urls.importVendorCSV, payload);

export const columnMapping = (id: string) =>
  api.get(urls.columnMapping.replace('{importJobId}', id));

import { urls } from '@/constants/urls';
import { api } from '../api';

export const importCSV = (payload: any) => api.post(urls.importCSV, payload);

export const columnMapping = (id: string) =>
  api.get(urls.columnMapping.replace('{importJobId}', id));

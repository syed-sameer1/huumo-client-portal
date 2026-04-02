import { urls } from '@/constants/urls';
import { api } from '../api';

export const importCSV = (payload: any) => api.post(urls.importCSV, payload);

export const importVendorCSV = (payload: any) =>
  api.post(urls.importVendorCSV, payload);

export const columnMapping = (id: string) =>
  api.get(urls.columnMapping.replace('{importJobId}', id));

// Starts the actual import process for a completed preview job.
// Backend expects body: { id: <importJobId> }
export const processImport = (payload: { id: string | number }) =>
  api.post(`/imports/process/${payload.id}`, payload);

/** CSV of vendors missing email for this import job — adjust path if your API differs */
export const downloadMissingVendorEmailCsv = (importJobId: string) =>
  api.get(`/imports/import-job/${importJobId}/missing-vendor-emails/csv`, {
    responseType: 'blob',
  });

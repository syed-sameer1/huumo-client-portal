import {
  columnMapping,
  importCSV,
  importVendorCSV,
  processImport,
  downloadMissingVendorEmailCsv,
  googleSheetCSVImport,
} from '@/service/csv-imports/csv-imports';
import { useApiMutation, useApiQuery } from './query';
import { ImportJobQueryOptions, ImportJobResponse } from '@/types/csvImport';

export const useImportCSV = (options?: any) => {
  return useApiMutation(importCSV, options);
};

export const useProcessImport = (options?: any) => {
  return useApiMutation(processImport, options);
};

export const useImportColumn = (
  id: string,
  options?: ImportJobQueryOptions,
) => {
  return useApiQuery<ImportJobResponse, any, ImportJobResponse, any>({
    queryKey: ['column-mapping', id],
    queryFn: () => columnMapping(id),
    retry: 1,
    enabled: !!id,
    ...options,
  });
};

export const useImportVendorCSV = (options?: any) => {
  return useApiMutation(importVendorCSV, options);
};

export const useDownloadMissingVendorEmailCsv = (options?: any) => {
  return useApiMutation(downloadMissingVendorEmailCsv, options);
};

export const useGoogleSheetCSVImport = (options?: any) => {
  return useApiMutation(googleSheetCSVImport, options);
};

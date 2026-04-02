import {
  columnMapping,
  importCSV,
  importVendorCSV,
  processImport,
} from '@/service/csv-imports/csv-imports';
import { useApiMutation, useApiQuery } from './query';
import type { UseQueryOptions } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const useImportCSV = (options?: any) => {
  return useApiMutation(importCSV, options);
};

export const useProcessImport = (options?: any) => {
  return useApiMutation(processImport, options);
};

type ImportJobResponse = AxiosResponse<{
  data?: {
    headers?: string[];
    status?: string;
    importJobId?: number;
    [key: string]: unknown;
    previewSummary: {
      duplicateRows: number;
      errorBreakdown: Record<string, number>;
      invalidRows: number;
      missingVendorEmailCount: number;
      overdueCount: number;
      topErrors: string[];
      totalRows: number;
      validRows: number;
    };
  };
  [key: string]: unknown;
}>;

type ImportJobQueryOptions = Omit<
  UseQueryOptions<ImportJobResponse, any, ImportJobResponse, any>,
  'queryKey' | 'queryFn'
>;

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

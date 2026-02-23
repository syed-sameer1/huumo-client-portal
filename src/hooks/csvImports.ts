import {
  columnMapping,
  importCSV,
  importVendorCSV,
} from '@/service/csv-imports/csv-imports';
import { useApiMutation, useApiQuery } from './query';

export const useImportCSV = (options?: any) => {
  return useApiMutation(importCSV, options);
};

export const useImportColumn = (id: string) => {
  return useApiQuery({
    queryKey: ['column-mapping', id],
    queryFn: () => columnMapping(id),
  });
};

export const useImportVendorCSV = (options?: any) => {
  return useApiMutation(importVendorCSV, options);
};

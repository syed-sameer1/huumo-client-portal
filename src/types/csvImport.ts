import { AxiosResponse } from 'axios';
import type { UseQueryOptions } from '@tanstack/react-query';

export type PreviewSummaryType = {
  duplicateRows: number;
  errorBreakdown: Record<string, number>;
  invalidRows: number;
  missingVendorEmailCount: number;
  overdueCount: number;
  topErrors: string[];
  totalRows: number;
  validRows: number;
  newPOs: number;
  existingPOs: number;
  uniquePOs: number;
};

export type ImportJobResponse = AxiosResponse<{
  data?: {
    headers?: string[];
    status?: string;
    importJobId?: number;
    [key: string]: unknown;
    previewSummary: PreviewSummaryType;
  };
  [key: string]: unknown;
}>;

export type ImportJobQueryOptions = Omit<
  UseQueryOptions<ImportJobResponse, any, ImportJobResponse, any>,
  'queryKey' | 'queryFn'
>;

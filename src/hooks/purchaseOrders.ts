import { mappingSubmit } from '@/service/purchaseOrders/columnMapping';
import { useApiMutation, useApiQuery } from './query';
import {
  purchaseOrderDetails,
  purchaseOrdersService,
  purchaseOrderStats,
  createPurchaseOrder,
  bulkDeletePurchaseOrders,
  type BulkDeletePurchaseOrdersPayload,
  exportCsvPurchaseOrders,
  type ExportPurchaseOrdersCsvParams,
  type PurchaseOrdersParams,
} from '@/service/purchaseOrders/purchaseOrders';
import { keepPreviousData } from '@tanstack/react-query';
import { MutationOptions } from '@/types/query';
import { ManualPurchaseOrderValues } from '@/schema/purchaseOrder';
import { AxiosError } from 'axios';

export const PAGE_SIZE = 20;

export const useColumnMapping = (options?: any) => {
  return useApiMutation(mappingSubmit, options);
};

export const usePurchaseOrders = (
  page: number,
  filterParams?: Omit<PurchaseOrdersParams, 'limit' | 'pageNumber'>,
) => {
  const res = useApiQuery({
    queryKey: ['purchase-orders', page, filterParams],
    queryFn: () => {
      return purchaseOrdersService({
        pageNumber: page,
        limit: PAGE_SIZE,
        ...filterParams,
      });
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
  return {
    loading: res.isLoading,
    isPending: res.isPending,
    data: res.data?.data,
    refetch: res.refetch,
    status: res.status,
    isFetching: res.isFetching,
  };
};

export const usePurchaseOrdersDetails = (id: string) => {
  return useApiQuery({
    queryKey: ['purchase-orders-details', id],
    queryFn: () => purchaseOrderDetails(id),
    enabled: !!id,
    retry: false,
  });
};

export const usePurchaseOrdersStats = () => {
  return useApiQuery({
    queryKey: ['purchase-orders-stats'],
    queryFn: () => purchaseOrderStats(),
    retry: false,
  });
};

export const useCreatePurchaseOrder = (
  options?: MutationOptions<
    any,
    AxiosError<{ message?: string }>,
    ManualPurchaseOrderValues
  >,
) => {
  return useApiMutation(createPurchaseOrder, options);
};

export const useBulkDeletePurchaseOrder = (
  options?: MutationOptions<
    any,
    AxiosError<{ message?: string }>,
    BulkDeletePurchaseOrdersPayload
  >,
) => {
  return useApiMutation(bulkDeletePurchaseOrders, options);
};

export const useExportCsvPurchaseOrders = (
  options?: MutationOptions<
    Blob,
    AxiosError<{ message?: string }>,
    ExportPurchaseOrdersCsvParams | undefined
  >,
) => {
  return useApiMutation(exportCsvPurchaseOrders, options);
};

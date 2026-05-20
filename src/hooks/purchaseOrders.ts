import { mappingSubmit } from '@/service/purchaseOrders/columnMapping';
import { useApiMutation, useApiQuery } from './query';
import {
  purchaseOrderDetails,
  purchaseOrdersService,
  purchaseOrderStats,
  createPurchaseOrder,
  bulkPurchaseOrderAction,
  sendFollowUp,
  type PurchaseOrderBulkActionPayload,
  type SendFollowUpResponse,
  exportCsvPurchaseOrders,
  type ExportPurchaseOrdersCsvParams,
  type PurchaseOrdersParams,
} from '@/service/purchaseOrders/purchaseOrders';
import { keepPreviousData } from '@tanstack/react-query';
import { MutationOptions } from '@/types/query';
import { ManualPurchaseOrderValues } from '@/schema/purchaseOrder';
import { AxiosError } from 'axios';

/** Default page size for tables that still import this constant (roles, vendors, etc.). */
export const PAGE_SIZE = 50;

export const useColumnMapping = (options?: any) => {
  return useApiMutation(mappingSubmit, options);
};

export const usePurchaseOrders = (
  page: number,
  filterParams?: Omit<PurchaseOrdersParams, 'limit' | 'pageNumber'>,
  pageSize: number = PAGE_SIZE,
) => {
  const res = useApiQuery({
    queryKey: ['purchase-orders', page, filterParams, pageSize],
    queryFn: () => {
      return purchaseOrdersService({
        pageNumber: page,
        limit: pageSize,
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

export const usePurchaseOrderBulkAction = (
  options?: MutationOptions<
    unknown,
    AxiosError<{ message?: string }>,
    PurchaseOrderBulkActionPayload
  >,
) => {
  return useApiMutation(bulkPurchaseOrderAction, options);
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

export const useSendFollowUp = (
  options?: MutationOptions<
    SendFollowUpResponse,
    AxiosError<{ message?: string }>,
    string
  >,
) => {
  return useApiMutation(sendFollowUp, options);
};

import { mappingSubmit } from '@/service/purchaseOrders/columnMapping';
import { useApiMutation, useApiQuery } from './query';
import {
  purchaseOrderDetails,
  purchaseOrdersService,
} from '@/service/purchaseOrders/purchaseOrders';
import { keepPreviousData } from '@tanstack/react-query';

export const PAGE_SIZE = 20;

export const useColumnMapping = (options?: any) => {
  return useApiMutation(mappingSubmit, options);
};

export const usePurchaseOrders = (page: number) => {
  return useApiQuery({
    queryKey: ['purchase-orders', page],
    queryFn: () => {
      return purchaseOrdersService({ pageNumber: page, limit: PAGE_SIZE });
    },
    placeholderData: keepPreviousData,
  });
};

export const usePurchaseOrdersDetails = (id: string) => {
  return useApiQuery({
    queryKey: ['purchase-orders-details', id],
    queryFn: () => purchaseOrderDetails(id),
    enabled: !!id,
  });
};

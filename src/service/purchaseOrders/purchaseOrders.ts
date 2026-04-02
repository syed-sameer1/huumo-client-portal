import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';
import { PurchaseOrders, PurchaseOrdersResponse } from '@/types/purchaseOrders';
import { ManualPurchaseOrderValues } from '@/schema/purchaseOrder';

export interface CreatePurchaseOrderResponse {
  id: string;
  name: string;
  description: string;
}

export interface PurchaseOrdersParams {
  limit: number;
  pageNumber: number;
  searchValue?: string;
  orderDateFrom?: string;
  orderDateTo?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  status?: string;
}

export const purchaseOrdersService = (
  params: PurchaseOrdersParams,
): Promise<AxiosResponse<PurchaseOrdersResponse>> => {
  const query = new URLSearchParams();
  query.set('limit', String(params.limit));
  query.set('pageNumber', String(params.pageNumber));
  if (params.searchValue) query.set('searchValue', params.searchValue);
  if (params.orderDateFrom) query.set('orderDateFrom', params.orderDateFrom);
  if (params.orderDateTo) query.set('orderDateTo', params.orderDateTo);
  if (params.dueDateFrom) query.set('dueDateFrom', params.dueDateFrom);
  if (params.dueDateTo) query.set('dueDateTo', params.dueDateTo);
  if (params.status) query.set('status', params.status);
  return api.get(`${urls.purchaseOrder}/?${query.toString()}`);
};

export const purchaseOrderDetails = (
  purchaseOrderId: string,
): Promise<AxiosResponse<{ purchaseOrder: PurchaseOrders }>> =>
  api.get(
    urls.purchaseOrderDetails.replace('{purchaseOrderId}', purchaseOrderId),
  );

export const purchaseOrderStats = (): Promise<
  AxiosResponse<{
    missingEmails: number;
    needsAttention: number;
    overdue: number;
    total: number;
  }>
> => api.get(urls.purchaseOrderStats);

export const createPurchaseOrder = (
  purchaseOrder: ManualPurchaseOrderValues,
): Promise<AxiosResponse<CreatePurchaseOrderResponse>> =>
  api.post(urls.purchaseOrder, purchaseOrder);

export type BulkDeletePurchaseOrdersPayload = {
  poIds: number[];
  force: boolean;
};

export const bulkDeletePurchaseOrders = (
  payload: BulkDeletePurchaseOrdersPayload,
): Promise<AxiosResponse<unknown>> =>
  api.delete('/purchase-order/bulk-delete', { data: payload });

export type ExportPurchaseOrdersCsvParams = {
  searchValue?: string;
  orderDateFrom?: string;
  orderDateTo?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  status?: string;
};

export const exportCsvPurchaseOrders = (
  params?: ExportPurchaseOrdersCsvParams,
): Promise<AxiosResponse<Blob>> => {
  const qs = new URLSearchParams();
  if (params?.searchValue) qs.set('searchValue', params.searchValue);
  if (params?.orderDateFrom) qs.set('orderDateFrom', params.orderDateFrom);
  if (params?.orderDateTo) qs.set('orderDateTo', params.orderDateTo);
  if (params?.dueDateFrom) qs.set('dueDateFrom', params.dueDateFrom);
  if (params?.dueDateTo) qs.set('dueDateTo', params.dueDateTo);
  if (params?.status) qs.set('status', params.status);

  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return api.get(`${urls.purchaseOrderExport}${suffix}`, {
    responseType: 'blob',
  });
};

import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';
import {
  PurchaseOrdersResponse,
  PurchaseOrdersDetailsResponse,
} from '@/types/purchaseOrders';
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
  statuses?: string[];
  secondaryFlags?: string[];
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
  params.statuses?.forEach((s) => query.append('status', s));
  params.secondaryFlags?.forEach((f) => query.append('secondaryFlag', f));
  return api.get(`${urls.purchaseOrder}/?${query.toString()}`);
};

export const purchaseOrderDetails = (
  purchaseOrderId: string,
): Promise<AxiosResponse<PurchaseOrdersDetailsResponse>> =>
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

export type PurchaseOrderBulkAction = 'close' | 'delete';

export type PurchaseOrderBulkActionPayload = {
  poIds: number[];
  action: PurchaseOrderBulkAction;
};

export const bulkPurchaseOrderAction = (
  payload: PurchaseOrderBulkActionPayload,
): Promise<AxiosResponse<unknown>> =>
  api.post(urls.purchaseOrderBulkAction, payload);

/** @deprecated Use `bulkPurchaseOrderAction` with `{ poIds, action: 'delete' }`. */
export type BulkDeletePurchaseOrdersPayload = {
  poIds: number[];
  force: boolean;
};

/** @deprecated Use `bulkPurchaseOrderAction`. */
export const bulkDeletePurchaseOrders = (
  payload: BulkDeletePurchaseOrdersPayload,
): Promise<AxiosResponse<unknown>> =>
  api.delete(urls.bulkDeletePurchaseOrders, { data: payload });

export type ExportPurchaseOrdersCsvParams = {
  searchValue?: string;
  orderDateFrom?: string;
  orderDateTo?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
  statuses?: string[];
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
  params?.statuses?.forEach((s) => qs.append('status', s));

  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return api.get(`${urls.purchaseOrderExport}${suffix}`, {
    responseType: 'blob',
  });
};

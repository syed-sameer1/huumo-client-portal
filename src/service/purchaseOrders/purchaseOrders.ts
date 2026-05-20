import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';
import {
  POStatus,
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
  vendorId?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
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
  if (params.vendorId) query.set('vendorId', params.vendorId);
  params.statuses?.forEach((s) => query.append('status', s));
  params.secondaryFlags?.forEach((f) => query.append('secondaryFlag', f));
  if (params.sortBy) {
    query.set('sortBy', params.sortBy);
    if (params.sortOrder) query.set('sortOrder', params.sortOrder);
  }
  return api.get(`${urls.purchaseOrder}/?${query.toString()}`);
};

export const purchaseOrderDetails = (
  purchaseOrderId: string,
): Promise<AxiosResponse<PurchaseOrdersDetailsResponse>> =>
  api.get(
    urls.purchaseOrderDetails.replace('{purchaseOrderId}', purchaseOrderId),
  );

export type SendFollowUpResponse = {
  message?: string;
} & Record<string, unknown>;

export const sendFollowUp = (
  poId: string,
): Promise<AxiosResponse<SendFollowUpResponse>> => {
  const path = urls.sendFollowUp.replace('{poId}', poId);
  return api.post(path);
};

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

export type PurchaseOrderBulkAction = 'close' | 'delete' | POStatus;

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
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
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
  if (params?.sortBy) {
    qs.set('sortBy', params.sortBy);
    if (params.sortOrder) qs.set('sortOrder', params.sortOrder);
  }

  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return api.get(`${urls.purchaseOrderExport}${suffix}`, {
    responseType: 'blob',
  });
};

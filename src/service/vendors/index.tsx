import { urls } from '@/constants/urls';
import { api } from '../api';
import { VendorDetailsRespone, VendorsDataResponse } from '@/types/vendors';
import { AxiosResponse } from 'axios';
import { AddVendorFieldValues } from '@/schema/vendor';

export type GetVendorsParams = {
  limit: number;
  pageNumber: number;
  searchValue?: string;
  confirmationRateMin?: number;
  confirmationRateMax?: number;
  performanceScoreMin?: number;
  performanceScoreMax?: number;
  riskLevel?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  missingEmail?: boolean;
  vendorId?: string;
};

export const getVendors = (
  params: GetVendorsParams,
): Promise<AxiosResponse<VendorsDataResponse>> => {
  const q = new URLSearchParams();
  q.set('limit', String(params.limit));
  q.set('pageNumber', String(params.pageNumber));
  if (params.searchValue) q.set('searchValue', params.searchValue);
  if (params.vendorId) q.set('vendorId', params.vendorId);
  if (params.confirmationRateMin !== undefined) {
    q.set('confirmationRateMin', String(params.confirmationRateMin));
  }
  if (params.confirmationRateMax !== undefined) {
    q.set('confirmationRateMax', String(params.confirmationRateMax));
  }
  if (params.performanceScoreMin !== undefined) {
    q.set('performanceScoreMin', String(params.performanceScoreMin));
  }
  if (params.performanceScoreMax !== undefined) {
    q.set('performanceScoreMax', String(params.performanceScoreMax));
  }
  if (params.riskLevel) q.set('riskLevel', params.riskLevel);
  if (params.sortBy) {
    q.set('sortBy', params.sortBy);
    if (params.sortOrder) q.set('sortOrder', params.sortOrder);
  }
  if (params.missingEmail === true) q.set('missingEmail', 'true');
  return api.get(`${urls.vendors}/?${q.toString()}`);
};

export const createVendor = (payload: AddVendorFieldValues) =>
  api.post(urls.vendors, payload);

export const deleteVendor = (id: string) =>
  api.delete(urls.deleteVendor.replace('{id}', id));

export const updateVendor = ({
  payload,
  id,
}: {
  payload: AddVendorFieldValues;
  id: number;
}) => api.patch(urls.vendors, { ...payload, vendorId: id });

export const vendorDetails = (
  id: string,
): Promise<AxiosResponse<VendorDetailsRespone>> => {
  return api.get(urls.vendor.replace('{id}', id));
};

export type ExportVendorsCsvParams = {
  searchValue?: string;
  confirmationRateMin?: string;
  confirmationRateMax?: string;
  performanceScoreMin?: string;
  performanceScoreMax?: string;
  riskLevel?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  missingEmail?: boolean;
};

export type VendorBulkActionPayload = {
  vendorIds: number[];
  action: 'delete';
};

export const vendorBulkAction = (
  payload: VendorBulkActionPayload,
): Promise<AxiosResponse<unknown>> => api.post(urls.vendorBulkAction, payload);

export const exportCsvVendors = (
  params?: ExportVendorsCsvParams,
): Promise<AxiosResponse<Blob>> => {
  const qs = new URLSearchParams();
  if (params?.searchValue) qs.set('searchValue', params.searchValue);
  if (params?.confirmationRateMin) {
    qs.set('confirmationRateMin', params.confirmationRateMin);
  }
  if (params?.confirmationRateMax) {
    qs.set('confirmationRateMax', params.confirmationRateMax);
  }
  if (params?.performanceScoreMin) {
    qs.set('performanceScoreMin', params.performanceScoreMin);
  }
  if (params?.performanceScoreMax) {
    qs.set('performanceScoreMax', params.performanceScoreMax);
  }
  if (params?.riskLevel) qs.set('riskLevel', params.riskLevel);
  if (params?.sortBy) {
    qs.set('sortBy', params.sortBy);
    if (params.sortOrder) qs.set('sortOrder', params.sortOrder);
  }
  if (params?.missingEmail === true) qs.set('missingEmail', 'true');

  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return api.get(`${urls.vendorExport}${suffix}`, {
    responseType: 'blob',
  });
};

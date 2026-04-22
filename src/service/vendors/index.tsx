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
  presets?: string[];
};

export const getVendors = (
  params: GetVendorsParams,
): Promise<AxiosResponse<VendorsDataResponse>> => {
  const q = new URLSearchParams();
  q.set('limit', String(params.limit));
  q.set('pageNumber', String(params.pageNumber));
  if (params.searchValue) q.set('searchValue', params.searchValue);
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
  params.presets?.forEach((p) => q.append('preset', p));
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
  presets?: string[];
};

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
  params?.presets?.forEach((p) => qs.append('preset', p));

  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return api.get(`${urls.vendorExport}${suffix}`, {
    responseType: 'blob',
  });
};

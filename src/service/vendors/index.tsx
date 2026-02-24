import { urls } from '@/constants/urls';
import { api } from '../api';
import { VendorDetailsRespone, VendorsDataResponse } from '@/types/vendors';
import { AxiosResponse } from 'axios';
import { AddVendorFieldValues } from '@/schema/vendor';

export const getVendors = ({
  limit,
  pageNumber,
}: {
  limit: number;
  pageNumber: number;
}): Promise<AxiosResponse<VendorsDataResponse>> =>
  api.get(`${urls.vendors}/?limit=${limit}&pageNumber=${pageNumber}`);

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

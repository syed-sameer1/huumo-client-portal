import {
  createVendor,
  deleteVendor,
  getVendors,
  updateVendor,
  vendorDetails,
} from '@/service/vendors';
import { useApiMutation, useApiQuery } from './query';
import { PAGE_SIZE } from './purchaseOrders';
import {
  keepPreviousData,
  MutationOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AddVendorFieldValues } from '@/schema/vendor';
import { VendorDetailsRespone } from '@/types/vendors';
import { vendorMappingSubmit } from '@/service/purchaseOrders/columnMapping';

export const useVendorsData = (page: number) => {
  return useApiQuery({
    queryKey: ['vendors-data', page],
    queryFn: async () => {
      const res = await getVendors({ pageNumber: page, limit: PAGE_SIZE });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useVendorColumnMapping = (options?: any) => {
  return useApiMutation(vendorMappingSubmit, options);
};

export const useAddVendor = (
  options?: MutationOptions<any, Error, AddVendorFieldValues>,
) => {
  return useApiMutation(createVendor, options);
};

export const useDeleteVendor = () => {
  return useApiMutation(deleteVendor);
};

type UpdateVendorVariables = {
  payload: AddVendorFieldValues;
  id: number;
};

export const useUpdateVendor = (
  options?: MutationOptions<any, Error, UpdateVendorVariables>,
) => {
  return useApiMutation(updateVendor, options);
};

export const useVendorDetails = (
  id: number,
): UseQueryResult<VendorDetailsRespone, unknown> => {
  return useApiQuery({
    queryKey: ['vendors-details', id],
    queryFn: async () => {
      const res = await vendorDetails(id.toString());
      return res.data; // res.data has type VendorDetailsRespone
    },
  });
};

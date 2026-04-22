import {
  createVendor,
  deleteVendor,
  exportCsvVendors,
  getVendors,
  updateVendor,
  vendorDetails,
  type ExportVendorsCsvParams,
} from '@/service/vendors';
import { vendorFiltersToApiQuery } from '@/components/vendors/VendorFilters/constants';
import type { VendorFiltersState } from '@/components/vendors/VendorFilters/constants';
import { useApiMutation, useApiQuery } from './query';
import { PAGE_SIZE } from './purchaseOrders';
import { MutationOptions } from '@/types/query';
import { keepPreviousData, UseQueryResult } from '@tanstack/react-query';
import { AddVendorFieldValues } from '@/schema/vendor';
import { VendorDetailsRespone } from '@/types/vendors';
import { vendorMappingSubmit } from '@/service/purchaseOrders/columnMapping';
import { AxiosError } from 'axios';

export const useVendorsData = (
  page: number,
  filters?: VendorFiltersState,
  pageSize: number = PAGE_SIZE,
) => {
  const apiFilters = filters ? vendorFiltersToApiQuery(filters) : {};
  return useApiQuery({
    queryKey: ['vendors-data', page, pageSize, apiFilters],
    queryFn: async () => {
      const res = await getVendors({
        pageNumber: page,
        limit: pageSize,
        ...apiFilters,
      });
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

export const useExportCsvVendors = (
  options?: MutationOptions<
    Blob,
    AxiosError<{ message?: string }>,
    ExportVendorsCsvParams | undefined
  >,
) => {
  return useApiMutation(exportCsvVendors, options);
};

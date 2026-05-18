import {
  activateClient,
  updateFollowUpFrequency,
  createUser,
  clientSettings,
} from '@/service/client/client';
import { deleteUser, getUsers, updateUser } from '@/service/users';
import { useApiMutation, useApiQuery } from './query';
import { keepPreviousData } from '@tanstack/react-query';
import { PAGE_SIZE } from './purchaseOrders';
import { rolesFiltersToApiParams } from '@/components/roles/RolesFilters/constants';
import type { RolesFiltersState } from '@/components/roles/RolesFilters/constants';

export const useClientActivate = (options?: any) => {
  return useApiMutation(activateClient, options);
};

export const useClientUpdateFrequency = (options?: any) => {
  return useApiMutation(updateFollowUpFrequency, options);
};

export const useCreateUser = (options?: any) => {
  return useApiMutation(createUser, options);
};

export const useUpdateUser = (options?: any) => {
  return useApiMutation(updateUser, options);
};

export const useDeleteUser = (options?: any) => {
  return useApiMutation(deleteUser, options);
};

export const useClientSettings = () => {
  return useApiQuery({
    queryKey: ['client-settings'],
    queryFn: () => clientSettings(),
    retry: false,
  });
};

export const useUsersData = (page: number) => {
  return useApiQuery({
    queryKey: ['users-data', page],
    queryFn: async () => {
      const res = await getUsers({ pageNumber: page, limit: PAGE_SIZE });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

/** Roles list: passes search, role, and status query params to GET /user (server paginates and filters). */
export const useRolesUsersData = (page: number, filters: RolesFiltersState) => {
  return useApiQuery({
    queryKey: [
      'users-data',
      page,
      filters.searchValue,
      [...filters.roles].sort().join(','),
      [...filters.statuses].sort().join(','),
    ],
    queryFn: async () => {
      const res = await getUsers({
        pageNumber: page,
        limit: PAGE_SIZE,
        ...rolesFiltersToApiParams(filters),
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

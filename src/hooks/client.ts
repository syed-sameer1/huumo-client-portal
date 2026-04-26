import {
  activateClient,
  updateFollowUpFrequency,
  createUser,
  clientSettings,
} from '@/service/client/client';
import { deleteUser, getUsers, updateUser } from '@/service/users';
import type { User } from '@/service/users';
import { useApiMutation, useApiQuery } from './query';
import { keepPreviousData } from '@tanstack/react-query';
import { PAGE_SIZE } from './purchaseOrders';
import {
  applyRolesFilters,
  needsRolesClientAggregation,
} from '@/components/roles/RolesFilters/constants';
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

/** Roles list: server pagination when unfiltered; loads all pages and filters in memory when search/filters are active (API has no filter params). */
export const useRolesUsersData = (page: number, filters: RolesFiltersState) => {
  const aggregate = needsRolesClientAggregation(filters);

  return useApiQuery({
    queryKey: [
      'users-data',
      page,
      filters.searchValue,
      [...filters.roles].sort().join(','),
      [...filters.statuses].sort().join(','),
    ],
    queryFn: async () => {
      if (!aggregate) {
        const res = await getUsers({ pageNumber: page, limit: PAGE_SIZE });
        return res.data;
      }

      const allUsers: User[] = [];
      let p = 1;
      let total = 0;

      while (true) {
        const res = await getUsers({ pageNumber: p, limit: PAGE_SIZE });
        total = res.data.totalUsers;
        allUsers.push(...res.data.users);
        if (allUsers.length >= total || res.data.users.length === 0) break;
        p += 1;
        if (p > 500) break;
      }

      const filtered = applyRolesFilters(allUsers, filters);
      const start = (page - 1) * PAGE_SIZE;

      return {
        users: filtered.slice(start, start + PAGE_SIZE),
        totalUsers: filtered.length,
      };
    },
    placeholderData: keepPreviousData,
  });
};

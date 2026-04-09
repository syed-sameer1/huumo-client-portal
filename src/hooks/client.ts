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

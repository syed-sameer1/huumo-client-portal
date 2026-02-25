import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  tempToken?: string | null;
}

export interface UsersListResponse {
  users: User[];
  totalUsers: number;
}

export type UpdateUserPayload = {
  name: string;
  email: string;
  role: string;
};

export const getUsers = (params: {
  pageNumber: number;
  limit: number;
}): Promise<AxiosResponse<UsersListResponse>> => {
  return api.get(urls.users, { params });
};

export const updateUser = (
  payload: UpdateUserPayload & { status?: string },
): Promise<AxiosResponse<User>> => {
  return api.patch(urls.users, payload);
};

export const deleteUser = (id: string) => {
  return api.delete(urls.deleteUser.replace('{id}', id));
};


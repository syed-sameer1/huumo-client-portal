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

export type GetUsersParams = {
  pageNumber: number;
  limit: number;
  searchValue?: string;
  role?: string[];
  status?: string[];
};

export const getUsers = (
  params: GetUsersParams,
): Promise<AxiosResponse<UsersListResponse>> => {
  const q = new URLSearchParams();
  q.set('pageNumber', String(params.pageNumber));
  q.set('limit', String(params.limit));
  if (params.searchValue?.trim()) {
    q.set('searchValue', params.searchValue.trim());
  }
  params.role?.forEach((r) => q.append('role', r));
  params.status?.forEach((s) => q.append('status', s));
  return api.get(`${urls.users}?${q.toString()}`);
};

export const updateUser = (
  payload: UpdateUserPayload & { status?: string },
): Promise<AxiosResponse<User>> => {
  return api.patch(urls.users, payload);
};

export const deleteUser = (id: string) => {
  return api.delete(urls.deleteUser.replace('{id}', id));
};


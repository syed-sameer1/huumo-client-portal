import { LoginFormValues } from '@/components/auth/types';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import { urls } from '@/constants/urls';
import { AuthResponse } from '../register/types';

export const login = (
  payload: LoginFormValues,
): Promise<AxiosResponse<AuthResponse>> => api.post(urls.login, payload);

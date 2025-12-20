import { SignupFormValues } from '@/components/auth/types';
import { api } from '../api';
import { urls } from '@/constants/urls';
import { AuthResponse } from './types';
import { AxiosResponse } from 'axios';

export const register = (
  payload: SignupFormValues,
): Promise<AxiosResponse<AuthResponse>> => api.post(urls.register, payload);

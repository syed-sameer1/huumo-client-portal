import { ForgotPasswordFormValues } from '@/components/auth/types';
import { AxiosResponse } from 'axios';
import { ForgotPasswordResponse } from './types';
import { urls } from '@/constants/urls';
import { api } from '../api';

export const forgotPassword = (
  payload: ForgotPasswordFormValues,
): Promise<AxiosResponse<ForgotPasswordResponse>> =>
  api.post(urls.forgotPassword, payload);

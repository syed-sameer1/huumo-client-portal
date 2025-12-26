import { api } from '../api';
import { urls } from '@/constants/urls';
import { AxiosResponse } from 'axios';
import { OtpResponse, OtpSendPayload, OtpVerifyPayload } from './types';
import { AuthResponse } from '../register/types';

export const sendOtp = (
  payload: OtpSendPayload,
): Promise<AxiosResponse<OtpResponse>> => api.post(urls.sendOtp, payload);

export const verifyOtp = (
  payload: OtpVerifyPayload,
): Promise<AxiosResponse<AuthResponse>> => api.post(urls.verifyOtp, payload);

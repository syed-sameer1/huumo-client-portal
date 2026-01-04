import { AuthResponse } from '@/service/register/types';
import { useApiMutation } from './query';
import { LoginFormValues, SignupFormValues } from '@/components/auth/types';
import { MutationOptions } from '@/types/query';
import { register } from '@/service/register/register';
import { sendOtp, verifyOtp } from '@/service/otp/otp';
import {
  OtpResponse,
  OtpSendPayload,
  OtpVerifyPayload,
} from '@/service/otp/types';
import { login } from '@/service/login';
import { AxiosError } from 'axios';

export type ApiErrorResponse = {
  message?: string;
};

export const useSignupAuth = (
  options?: MutationOptions<AuthResponse, Error, SignupFormValues>,
) => {
  return useApiMutation(register, options);
};

export const useSendOtpAuth = (
  options?: MutationOptions<
    OtpResponse,
    AxiosError<ApiErrorResponse>,
    OtpSendPayload
  >,
) => {
  return useApiMutation(sendOtp, options);
};

export const useVerifyOtpAuth = (
  options?: MutationOptions<
    AuthResponse,
    AxiosError<ApiErrorResponse>,
    OtpVerifyPayload
  >,
) => {
  return useApiMutation(verifyOtp, options);
};

export const useLoginAuth = (
  options?: MutationOptions<
    AuthResponse,
    AxiosError<ApiErrorResponse>,
    LoginFormValues
  >,
) => {
  return useApiMutation(login, options);
};

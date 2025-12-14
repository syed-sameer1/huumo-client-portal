import {
  forgotPasswordSchema,
  loginSchema,
  otpSchema,
} from '@/schema/authSchema';
import * as z from 'zod';

export type LoginFormValues = z.infer<typeof loginSchema>;

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export type OtpFormValues = z.infer<typeof otpSchema>;

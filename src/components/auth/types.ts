import {
  companyDetailsSchema,
  forgotPasswordSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  signupSchema,
} from '@/schema/authSchema';
import * as z from 'zod';

export type LoginFormValues = z.infer<typeof loginSchema>;

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export type OtpFormValues = z.infer<typeof otpSchema>;

export type SignupFormValues = z.infer<typeof signupSchema>;

export type CompanyDetailsSchemaValues = z.infer<typeof companyDetailsSchema>;

export type ResetPasswordSchemaValues = z.infer<typeof resetPasswordSchema>;

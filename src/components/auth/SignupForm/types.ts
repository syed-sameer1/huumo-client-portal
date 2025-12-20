import { CompanyDetailsFormValues, SignupFormValues } from '../types';

export interface SignupFormProps {
  onContinue: (data: SignupFormValues) => void;
}

export type SignupFormData = SignupFormValues & CompanyDetailsFormValues;

export enum FormType {
  SIGNUP = 'signup',
  COMPANY_DETAILS = 'company-details',
}

export interface CompanyDetailsFormProps {
  name: string;
  email: string;
  password: string;
}

'use client';

import { useState } from 'react';
import { SignupForm } from '.';
import { CompanyDetailsForm } from './CompanyDetailsForm';
import { OTPForm } from '../OTPForm';

export const SignupContainer = () => {
  const [formType, setFormType] = useState('signup');
  if (formType === 'signup')
    return <SignupForm onContinue={() => setFormType('company-details')} />;
  if (formType === 'company-details')
    return <CompanyDetailsForm onContinue={() => setFormType('otp')} />;
  if (formType === 'otp')
    return (
      <OTPForm
        onBack={() => setFormType('company-details')}
        onSuccess={() => console.log('show something')}
      />
    );
};

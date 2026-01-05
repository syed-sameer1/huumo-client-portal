'use client';

import { OTPForm } from '@/components/auth/OTPForm';
import { Suspense } from 'react';

export default function VerifyEmailOTP() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPForm />
    </Suspense>
  );
}

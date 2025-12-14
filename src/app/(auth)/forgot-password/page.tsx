'use client';

import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { ForgotPasswordFormValues } from '@/components/auth/types';
import { InputWithLabel } from '@/components/form-inputs/InputWithLabel';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { forgotPasswordSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { OTPForm } from '@/components/auth/OTPForm';
import { useState } from 'react';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { AuthHeader } from '@/components/auth/AuthHeader';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [formType, setFormType] = useState('forgot-password');

  const { handleSubmit } = form;

  const onSubmit = (values: ForgotPasswordFormValues) => {
    console.log(values);
    setFormType('otp');
  };

  const onOtpBack = () => {
    setFormType('forgot-password');
  };

  const onOtpSuccess = () => {
    setFormType('reset-password');
  };

  if (formType === 'otp')
    return <OTPForm onBack={onOtpBack} onSuccess={onOtpSuccess} />;

  if (formType === 'reset-password')
    return <ResetPasswordForm onBack={() => setFormType('otp')} />;

  if (formType === 'forgot-password') {
    return (
      <AuthWrapper
        header={
          <AuthHeader
            backIcon={
              <Link className="p-0" href="/">
                <ArrowLeft />
              </Link>
            }
            title="Forgot Password"
            description="Enter the email address associated with your account to receive a
        4-digit verification code"
          />
        }
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <InputWithLabel
                    label="Email Address"
                    Input={
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    }
                    isRequired
                    id="email"
                  />
                )}
              />
              <Button className="bg-accent-foreground h-10 rounded-md w-full">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    );
  }
}

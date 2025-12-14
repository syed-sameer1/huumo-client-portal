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
import { ForgotPasswordHeader } from './ForgotPasswordHeader';
import { OTPForm } from '@/components/auth/OTPForm';
import { useState } from 'react';

export default function ForgotPassword() {
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const { handleSubmit } = form;

  const onSubmit = (values: ForgotPasswordFormValues) => {
    console.log(values);
    setShowOtpScreen(true);
  };

  const onOtpBack = () => {
    setShowOtpScreen(false);
  };

  if (showOtpScreen) return <OTPForm onBack={onOtpBack} />;

  return (
    <AuthWrapper header={<ForgotPasswordHeader />}>
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

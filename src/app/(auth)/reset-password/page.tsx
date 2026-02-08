'use client';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { ResetPasswordSchemaValues } from '@/components/auth/types';
import { resetPasswordSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import { InputWithLabel } from '@/components/form-inputs/InputWithLabel';
import { PasswordInput } from '@/components/form-inputs/PasswordInput';
import { Button } from '@/components/ui/button';

export default function ResetPassword() {
  const form = useForm<ResetPasswordSchemaValues>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: ResetPasswordSchemaValues) => {
    console.log('onSubmit', values);
  };

  return (
    <AuthWrapper
      header={
        <AuthHeader
          title="Create a New Password"
          description="Set a new password to complete your account setup."
        />
      }
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputWithLabel
                  label="Enter New Password"
                  Input={
                    <PasswordInput
                      id="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  }
                  isRequired
                  id="password"
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <InputWithLabel
                  label="Re-enter New Password"
                  Input={
                    <PasswordInput
                      id="confirmPassowrd"
                      placeholder="Re-enter New Password"
                      {...field}
                    />
                  }
                  isRequired
                  id="confirmPassword"
                />
              )}
            />
            <Button
              type="submit"
              className="bg-accent-foreground h-10 rounded-md"
            >
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
}

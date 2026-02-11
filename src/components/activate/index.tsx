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
import { useClientActivate } from '@/hooks/client';
import { useRouter } from 'next/navigation';
import { routeUrls } from '@/constants/urls';
import { LoadingButton } from '@/components/LoadingButton';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export const ActivateComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordSchemaValues>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useClientActivate();

  const { handleSubmit } = form;

  const onSubmit = (values: ResetPasswordSchemaValues) => {
    console.log('onSubmit', values);
    const token = searchParams.get('token');
    mutate(
      { password: values.password, token },
      {
        onSuccess: ({ data }) => {
          console.log({ data });
          router.push(routeUrls.loginRoute);
        },
      },
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthWrapper
        header={
          <AuthHeader
            title="Update your temporary password"
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
              <LoadingButton
                type="submit"
                className="bg-accent-foreground h-10 rounded-md"
                loading={isPending}
              >
                Confirm
              </LoadingButton>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </Suspense>
  );
};

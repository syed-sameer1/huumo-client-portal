'use client';

import { useForm } from 'react-hook-form';
import { LoginFormValues } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/authSchema';
import { Form, FormField } from '@/components/ui/form';
import { InputWithLabel } from '@/components/form-inputs/InputWithLabel';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/form-inputs/PasswordInput';
import Link from 'next/link';
import { SocialLogins } from './SocialLogins';
import { useLoginAuth } from '@/hooks/auth';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/LoadingButton';
import { useRouter } from 'next/navigation';
import { UserStatus } from '@/types/user';
import { urls } from '@/constants/urls';

export const LoginForm = () => {
  const { mutate, isPending } = useLoginAuth();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: (res) => {
        console.log(res);
        if (res.data.user.status === UserStatus.pending) {
          router.push(urls.otpRoute);
          return;
        }
        router.push('/purchase-orders');
        toast.success('Logged in successfully!');
      },
      onError: (error) => {
        console.log({ error });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputWithLabel
                label="Email Address"
                Input={
                  <Input id="email" placeholder="Enter your email" {...field} />
                }
                isRequired
                id="email"
              />
            )}
          />
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputWithLabel
                  label="Password"
                  Input={
                    <PasswordInput
                      id="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  }
                  isRequired
                  id="email"
                />
              )}
            />
            <Link
              className="text-sm text-muted-foreground mt-2 block"
              href="forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            Forgot your email address?{' '}
            <Link href="#" className="text-accent-foreground">
              Contact your administrator
            </Link>{' '}
            for help resetting your password.
          </div>
          <LoadingButton
            loading={isPending}
            type="submit"
            className="bg-accent-foreground h-10 rounded-md"
          >
            Log In
          </LoadingButton>
          <div className="text-sm text-secondary-foreground text-center">
            or continue with
          </div>
          <SocialLogins />
        </div>
      </form>
    </Form>
  );
};

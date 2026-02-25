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
import { UserRole, ClientStatus } from '@/types/user';
import { routeUrls } from '@/constants/urls';
import { useCreateSubscription } from '@/hooks/subscriptionPackages';

export const LoginForm = () => {
  const { mutate, isPending } = useLoginAuth();
  const router = useRouter();
  const { mutate: subscriptionMutate, isPending: subscriptionLoading } =
    useCreateSubscription();

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
        localStorage.setItem('access_token', res.data.accessToken);
        const subscriptionCheck =
          res.data.user.role === UserRole.owner &&
          res.data.user.client.status === ClientStatus.pending;
        if (subscriptionCheck) {
          subscriptionMutate(undefined, {
            onSuccess: (res) => {
              router.push(res.data.url);
            },
          });
          return;
        }
        router.push(routeUrls.purchaseOrdersRoute);
        toast.success('Logged in successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
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
            loading={isPending || subscriptionLoading}
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

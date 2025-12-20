'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { SignupFormValues } from '../types';
import { InputWithLabel } from '@/components/form-inputs/InputWithLabel';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/form-inputs/PasswordInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AuthWrapper } from '../AuthWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schema/authSchema';
import { useSendOtpAuth, useSignupAuth } from '@/hooks/auth';
import { LoadingButton } from '@/components/LoadingButton';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const { mutate, isPending } = useSignupAuth();
  const { mutate: authMutate, isPending: isOtpLoading } = useSendOtpAuth();
  const router = useRouter();
  const form = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      companyName: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: SignupFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('User registered successfully!');
        authMutate(
          { email: values.email },
          {
            onSuccess: () => {
              router.push(
                '/verify-email/otp?email=' + encodeURIComponent(values.email),
              );
            },
          },
        );
      },
      onError: (error) => {
        toast.error(`Registration failed: ${error.message}`);
      },
    });
  };

  return (
    <AuthWrapper
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <InputWithLabel
                  label="Name"
                  isRequired
                  Input={
                    <Input id="name" placeholder="Enter your name" {...field} />
                  }
                  id="name"
                />
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <InputWithLabel
                  label="Company Name"
                  isRequired
                  Input={
                    <Input
                      id="companyName"
                      placeholder="Enter your company name"
                      {...field}
                    />
                  }
                  id="companyName"
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <InputWithLabel
                  label="Email Address"
                  isRequired
                  Input={
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  }
                  id="email"
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputWithLabel
                  label="Password"
                  isRequired
                  Input={
                    <PasswordInput
                      id="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  }
                  id="password"
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <InputWithLabel
                  label="Re-enter Password"
                  isRequired
                  Input={
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Re-enter Password"
                      {...field}
                    />
                  }
                  id="confirmPassword"
                />
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(!!value)}
                        className="data-[state=checked]:border-[#20A665] border-[#A1A1AA] data-[state=checked]:bg-[#20A665]"
                      />
                    </FormControl>
                    <Label htmlFor="terms" className="text-sm text-foreground">
                      You agree to our Terms of Service and Privacy Policy.
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              className="bg-accent-foreground h-10 rounded-md"
              loading={isPending || isOtpLoading}
              disabled={isPending || isOtpLoading}
            >
              Continue
            </LoadingButton>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};

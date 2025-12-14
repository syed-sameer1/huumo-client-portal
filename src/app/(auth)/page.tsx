'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { loginSchema } from '@/schema/authSchema';
import { useForm } from 'react-hook-form';
import { LoginFormValues } from '@/components/auth/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { PasswordInput } from '@/components/form-inputs/PasswordInput';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Login() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: LoginFormValues) => {
    console.log(values);
  };
  return (
    <div className="relative h-full flex items-center">
      <AuthWrapper
        title="Log In"
        description="Enter your email and password below to log in to your account"
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="block mb-1">
                      Email Address{' '}
                      <span className="ml-1 text-destructive">*</span>
                    </Label>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password" className="block mb-1">
                      Password <span className="ml-1 text-destructive">*</span>
                    </Label>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <div className="text-sm text-muted-foreground">
                      Forgot password?
                    </div>
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground">
                Forgot your email address?{' '}
                <Link href="#" className="text-accent-foreground">
                  Contact your administrator
                </Link>{' '}
                for help resetting your password.
              </div>
              <Button className="bg-accent-foreground h-10 rounded-md">
                Log In
              </Button>
              <div className="text-sm text-secondary-foreground text-center">
                or continue with
              </div>
              <div className="flex justify-between gap-3">
                <Button className="border-muted bg-background text-foreground w-full gap-2 hover:bg-background transition-shadow duration-200 hover:shadow-md">
                  <Image
                    src="/images/google-icon.svg"
                    width={16}
                    height={16}
                    alt="google"
                  />
                  Google
                </Button>
                <Button className="border-muted bg-background text-foreground w-full gap-2 hover:bg-background transition-shadow duration-200 hover:shadow-md">
                  <Image
                    src="/images/outlook-icon.svg"
                    width={16}
                    height={16}
                    alt="google"
                  />
                  Outlook
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </AuthWrapper>
      <div className="flex items-center justify-center gap-3 absolute bottom-10 left-0 right-0">
        <Link href="#" className="text-accent-foreground">
          Terms of Service
        </Link>
        <div className="w-0.5 bg-[#EAEBEB] h-5 self-center"></div>
        <Link href="#" className="text-accent-foreground">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

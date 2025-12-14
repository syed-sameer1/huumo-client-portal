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
import { Button } from '@/components/ui/button';
import { AuthWrapper } from '../AuthWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schema/authSchema';
import { SignupFormProps } from './types';

export const SignupForm = ({ onContinue }: SignupFormProps) => {
  const form = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: SignupFormValues) => {
    console.log(values);
    onContinue();
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
                  Input={
                    <Input id="name" placeholder="Enter your name" {...field} />
                  }
                  id="name"
                />
              )}
            />
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
            <Button className="bg-accent-foreground h-10 rounded-md">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};

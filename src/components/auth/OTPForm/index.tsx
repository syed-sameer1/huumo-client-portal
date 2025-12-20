'use client';

import { AuthWrapper } from '../AuthWrapper';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { OtpFormValues } from '../types';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '@/schema/authSchema';
import { AuthHeader } from '../AuthHeader';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingButton } from '@/components/LoadingButton';
import { useSendOtpAuth, useVerifyOtpAuth } from '@/hooks/auth';
import { toast } from 'sonner';

export const OTPForm = () => {
  const router = useRouter();
  const email = useSearchParams().get('email');
  const { mutate, isPending } = useVerifyOtpAuth();
  const { mutate: sendAuth, isPending: isOtpLoading } = useSendOtpAuth();
  const form = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(otpSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: OtpFormValues) => {
    mutate(
      { otp: Number(values.otp) },
      {
        onSuccess: () => {
          toast.success('Account verified successfully!');
        },
        onError: (error) => {
          toast.error(`Registration failed: ${error.message}`);
        },
      },
    );
  };

  const onBack = () => {
    router.back();
  };

  const resendOtp = () => {
    console.log(router);
    if (!email) return;
    sendAuth(
      { email },
      {
        onSuccess: () => {
          toast.success('OTP resent successfully!');
        },
        onError: (error) => {
          toast.error(`Failed to resend OTP: ${error.message}`);
        },
      },
    );
  };

  return (
    <AuthWrapper
      header={
        <AuthHeader
          backIcon={
            <button onClick={onBack}>
              <ArrowLeft />
            </button>
          }
          title="OTP Verification"
          description={`Please enter the OTP you received on ${email}`}
        />
      }
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center flex-col gap-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    {...field}
                    id="otp"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              Expires in: <span className="text-accent-foreground">9s</span>
            </div>
            <div className="text-sm">
              Didn&apos;t receive code?{' '}
              <LoadingButton
                type="button"
                loading={isOtpLoading}
                onClick={resendOtp}
                className="text-accent-foreground underline p-0 bg-transparent hover:bg-transparent shadow-none"
              >
                Resend
              </LoadingButton>
            </div>
            <LoadingButton
              loading={isPending}
              disabled={isPending}
              className="bg-accent-foreground h-10 rounded-md w-full"
            >
              Continue
            </LoadingButton>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};

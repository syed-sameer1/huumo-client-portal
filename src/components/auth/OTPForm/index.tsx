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
import { Button } from '@/components/ui/button';
import { OTPFormProps } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '@/schema/authSchema';
import { AuthHeader } from '../AuthHeader';
import { ArrowLeft } from 'lucide-react';

export const OTPForm = ({ onBack, onSuccess }: OTPFormProps) => {
  const form = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(otpSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = (values: OtpFormValues) => {
    console.log(values);
    onSuccess();
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
          description="Please enter the OTP you received on johndoe@gmail.com"
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
              <button className="text-accent-foreground underline">
                Resend
              </button>
            </div>
            <Button className="bg-accent-foreground h-10 rounded-md w-full">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};

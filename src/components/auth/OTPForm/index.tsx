import { AuthWrapper } from '../AuthWrapper';
import { OTPHeader } from './OtpHeader';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { OtpFormValues } from '../types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { OTPFormProps } from './types';

export const OTPForm = ({ onBack }: OTPFormProps) => {
  const form = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (values: OtpFormValues) => {
    console.log(values);
  };

  return (
    <AuthWrapper header={<OTPHeader onBack={onBack} />}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center flex-col gap-4">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
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

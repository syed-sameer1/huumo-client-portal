import { ArrowLeft } from 'lucide-react';
import { OTPFormProps } from './types';

export const OTPHeader = ({ onBack }: OTPFormProps) => {
  const handleGoBack = () => {
    onBack();
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <button onClick={handleGoBack}>
          <ArrowLeft />
        </button>
        <div className="text-[20px] text-foreground">OTP Verification</div>
      </div>
      <div className="text-muted-foreground text-sm">
        Please enter the OTP you received on johndoe@gmail.com
      </div>
    </div>
  );
};
